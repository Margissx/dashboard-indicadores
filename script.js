/*
 * Dashboard de Indicadores
 * La estructura de datos y las consultas SQL equivalentes viven en database.sql.
 * En un sitio estático, estas funciones reproducen las agregaciones de SQLite
 * sobre el mismo conjunto de datos para evitar un backend o una base externa.
 */

const salesData = [
  { id: 1, date: "2025-01-08", month: "Enero", monthNumber: 1, category: "Software", product: "Licencia SaaS", clientId: 101, units: 2, sales: 1200 },
  { id: 2, date: "2025-01-21", month: "Enero", monthNumber: 1, category: "Servicios", product: "Consultoría", clientId: 102, units: 1, sales: 900 },
  { id: 3, date: "2025-02-05", month: "Febrero", monthNumber: 2, category: "Hardware", product: "Terminal Pro", clientId: 103, units: 3, sales: 760 },
  { id: 4, date: "2025-02-18", month: "Febrero", monthNumber: 2, category: "Software", product: "Licencia SaaS", clientId: 101, units: 2, sales: 1350 },
  { id: 5, date: "2025-03-11", month: "Marzo", monthNumber: 3, category: "Servicios", product: "Consultoría", clientId: 104, units: 2, sales: 1750 },
  { id: 6, date: "2025-03-26", month: "Marzo", monthNumber: 3, category: "Hardware", product: "Terminal Pro", clientId: 105, units: 4, sales: 1320 },
  { id: 7, date: "2025-04-09", month: "Abril", monthNumber: 4, category: "Software", product: "Licencia SaaS", clientId: 106, units: 3, sales: 2100 },
  { id: 8, date: "2025-04-23", month: "Abril", monthNumber: 4, category: "Hardware", product: "Terminal Pro", clientId: 107, units: 2, sales: 880 },
  { id: 9, date: "2025-05-07", month: "Mayo", monthNumber: 5, category: "Servicios", product: "Consultoría", clientId: 108, units: 3, sales: 2650 },
  { id: 10, date: "2025-05-20", month: "Mayo", monthNumber: 5, category: "Software", product: "Licencia SaaS", clientId: 109, units: 2, sales: 1720 },
  { id: 11, date: "2025-06-10", month: "Junio", monthNumber: 6, category: "Hardware", product: "Terminal Pro", clientId: 110, units: 5, sales: 1840 },
  { id: 12, date: "2025-06-24", month: "Junio", monthNumber: 6, category: "Servicios", product: "Consultoría", clientId: 111, units: 2, sales: 1900 },
  { id: 13, date: "2025-07-08", month: "Julio", monthNumber: 7, category: "Software", product: "Licencia SaaS", clientId: 112, units: 4, sales: 2850 },
  { id: 14, date: "2025-07-22", month: "Julio", monthNumber: 7, category: "Hardware", product: "Terminal Pro", clientId: 103, units: 3, sales: 1160 },
  { id: 15, date: "2025-08-06", month: "Agosto", monthNumber: 8, category: "Servicios", product: "Consultoría", clientId: 101, units: 3, sales: 2950 },
  { id: 16, date: "2025-08-19", month: "Agosto", monthNumber: 8, category: "Software", product: "Licencia SaaS", clientId: 104, units: 3, sales: 2440 },
  { id: 17, date: "2025-09-09", month: "Septiembre", monthNumber: 9, category: "Hardware", product: "Terminal Pro", clientId: 105, units: 4, sales: 1540 },
  { id: 18, date: "2025-09-23", month: "Septiembre", monthNumber: 9, category: "Servicios", product: "Consultoría", clientId: 106, units: 3, sales: 3150 },
  { id: 19, date: "2025-10-07", month: "Octubre", monthNumber: 10, category: "Software", product: "Licencia SaaS", clientId: 107, units: 5, sales: 3780 },
  { id: 20, date: "2025-10-21", month: "Octubre", monthNumber: 10, category: "Hardware", product: "Terminal Pro", clientId: 108, units: 3, sales: 1280 },
  { id: 21, date: "2025-11-05", month: "Noviembre", monthNumber: 11, category: "Servicios", product: "Consultoría", clientId: 109, units: 4, sales: 3960 },
  { id: 22, date: "2025-11-19", month: "Noviembre", monthNumber: 11, category: "Software", product: "Licencia SaaS", clientId: 110, units: 4, sales: 3380 },
  { id: 23, date: "2025-12-08", month: "Diciembre", monthNumber: 12, category: "Hardware", product: "Terminal Pro", clientId: 111, units: 5, sales: 2050 },
  { id: 24, date: "2025-12-18", month: "Diciembre", monthNumber: 12, category: "Servicios", product: "Consultoría", clientId: 112, units: 5, sales: 4800 }
];

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const chartColors = { Software: "#1b9a8f", Servicios: "#f5a85b", Hardware: "#8f83e7" };
const formatCurrency = (value) => `L ${new Intl.NumberFormat("es-HN", { maximumFractionDigits: 0 }).format(value)}`;
const formatNumber = (value) => new Intl.NumberFormat("es-HN", { maximumFractionDigits: 0 }).format(value);

/*
 * Traducción directa de las consultas de database.sql.
 * Esto mantiene el dashboard estático y evita un backend o una base externa.
 */
function runSqlQuery(queryName) {
  if (queryName === "kpis") {
    const totalSales = salesData.reduce((sum, row) => sum + row.sales, 0);
    const totalClients = new Set(salesData.map((row) => row.clientId)).size;
    const totalProducts = salesData.reduce((sum, row) => sum + row.units, 0);
    const firstHalf = salesData.filter((row) => row.monthNumber <= 6).reduce((sum, row) => sum + row.sales, 0);
    const secondHalf = salesData.filter((row) => row.monthNumber > 6).reduce((sum, row) => sum + row.sales, 0);
    const growth = ((secondHalf - firstHalf) / firstHalf) * 100;
    return { totalSales, totalClients, totalProducts, growth };
  }

  if (queryName === "monthlySales") {
    return monthNames.map((month, index) => {
      const rows = salesData.filter((row) => row.monthNumber === index + 1);
      return {
        month,
        sales: rows.reduce((sum, row) => sum + row.sales, 0),
        clients: new Set(rows.map((row) => row.clientId)).size,
        units: rows.reduce((sum, row) => sum + row.units, 0)
      };
    });
  }

  if (queryName === "categorySales") {
    return ["Software", "Servicios", "Hardware"].map((category) => ({
      category,
      sales: salesData.filter((row) => row.category === category).reduce((sum, row) => sum + row.sales, 0)
    }));
  }

  return [];
}

function renderKpis() {
  const { totalSales, totalClients, totalProducts, growth } = runSqlQuery("kpis");
  document.querySelector("#total-sales").textContent = formatCurrency(totalSales);
  document.querySelector("#total-clients").textContent = formatNumber(totalClients);
  document.querySelector("#total-products").textContent = formatNumber(totalProducts);
  document.querySelector("#sales-growth").textContent = `${growth.toFixed(1)}%`;
}

function renderTable() {
  const monthlySales = runSqlQuery("monthlySales");
  document.querySelector("#monthlyTableBody").innerHTML = monthlySales.map((row, index) => {
    const previous = monthlySales[index - 1];
    const variation = previous ? ((row.sales - previous.sales) / previous.sales) * 100 : null;
    const variationLabel = variation === null ? "—" : `${variation >= 0 ? "+" : ""}${variation.toFixed(1)}%`;
    return `<tr><td>${row.month}</td><td>${formatCurrency(row.sales)}</td><td>${row.clients}</td><td>${formatNumber(row.units)}</td><td>${variationLabel}</td></tr>`;
  }).join("");
}

function renderLegend(categorySales) {
  const total = categorySales.reduce((sum, row) => sum + row.sales, 0);
  document.querySelector("#categoryLegend").innerHTML = categorySales.map((row) => `
    <div class="legend-item">
      <span class="legend-swatch" style="background:${chartColors[row.category]}"></span>
      <span class="legend-label">${row.category}</span>
      <strong class="legend-value">${((row.sales / total) * 100).toFixed(1)}%</strong>
    </div>
  `).join("");
}

function renderCharts() {
  const monthlySales = runSqlQuery("monthlySales");
  const categorySales = runSqlQuery("categorySales");
  renderLegend(categorySales);

  if (typeof Chart === "undefined") {
    document.querySelector("#monthlyFallback").hidden = false;
    document.querySelector("#categoryFallback").hidden = false;
    return;
  }

  Chart.defaults.font.family = "DM Sans, Arial, sans-serif";
  Chart.defaults.font.size = 10;
  Chart.defaults.color = "#9aa6af";

  new Chart(document.querySelector("#monthlySalesChart"), {
    type: "line",
    data: {
      labels: monthlySales.map((row) => row.month.slice(0, 3)),
      datasets: [{
        data: monthlySales.map((row) => row.sales),
        borderColor: "#1b9a8f",
        backgroundColor: "rgba(27, 154, 143, 0.10)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#1b9a8f",
        pointBorderWidth: 2
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { displayColors: false, padding: 10, callbacks: { label: (context) => ` ${formatCurrency(context.parsed.y)}` } }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: { beginAtZero: true, border: { display: false }, grid: { color: "#edf0f1" }, ticks: { callback: (value) => `L ${value / 1000}k`, maxTicksLimit: 5 } }
      }
    }
  });

  new Chart(document.querySelector("#categorySalesChart"), {
    type: "doughnut",
    data: {
      labels: categorySales.map((row) => row.category),
      datasets: [{
        data: categorySales.map((row) => row.sales),
        backgroundColor: categorySales.map((row) => chartColors[row.category]),
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      cutout: "72%",
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { displayColors: false, padding: 10, callbacks: { label: (context) => ` ${formatCurrency(context.parsed)}` } }
      }
    }
  });
}

function initializeDashboard() {
  renderKpis();
  renderTable();
  renderCharts();
}

document.addEventListener("DOMContentLoaded", initializeDashboard);