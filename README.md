# Dashboard de Indicadores

Dashboard ejecutivo de analítica comercial para un portafolio de Ingeniería en Ciencias de la Computación.

## Vista general

Esta página está construida como un sitio estático pequeño y profesional. Presenta:

- Ventas totales.
- Clientes activos.
- Productos vendidos.
- Crecimiento de ventas entre semestres.
- Gráfico de ventas por mes.
- Gráfico de ventas por categoría.
- Tabla de resumen mensual.

## Tecnologías

- HTML5 semántico.
- CSS3 responsive, sin framework.
- JavaScript vanilla.
- SQLite-compatible SQL en `database.sql`.
- Chart.js para visualización.

## Estructura

```text
dashboard-indicadores/
├── index.html
├── style.css
├── script.js
├── database.sql
└── README.md
```

## Datos y consultas

Los datos son ficticios y están definidos en `database.sql`. El archivo incluye:

1. El esquema SQLite de la tabla `ventas`.
2. Las inserciones del periodo enero-diciembre de 2025.
3. Consultas para los KPI, el resumen mensual, las categorías y el crecimiento semestral.

Como este proyecto no utiliza backend, `script.js` contiene las mismas agregaciones SQL traducidas a JavaScript sobre el dataset equivalente. Esto permite abrir `index.html` directamente sin servidor ni base de datos externa, manteniendo las consultas SQL listas para ejecutarse en SQLite.

## Ejecución local

Abre `index.html` directamente en el navegador o levanta un servidor estático:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

Chart.js se carga desde jsDelivr para mantener el repositorio pequeño y sin backend, APIs ni servicios de datos externos.