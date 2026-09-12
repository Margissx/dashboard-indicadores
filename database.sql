-- Dashboard de Indicadores
-- Base de datos ficticia compatible con SQLite.
-- Periodo analizado: enero a diciembre de 2025.

DROP TABLE IF EXISTS ventas;

CREATE TABLE ventas (
  id INTEGER PRIMARY KEY,
  fecha TEXT NOT NULL,
  categoria TEXT NOT NULL,
  producto TEXT NOT NULL,
  cliente_id INTEGER NOT NULL,
  unidades INTEGER NOT NULL CHECK (unidades > 0),
  ventas REAL NOT NULL CHECK (ventas >= 0)
);

INSERT INTO ventas (id, fecha, categoria, producto, cliente_id, unidades, ventas) VALUES
  (1,  '2025-01-08', 'Software',  'Licencia SaaS', 101, 2, 1200),
  (2,  '2025-01-21', 'Servicios', 'Consultoría',  102, 1, 900),
  (3,  '2025-02-05', 'Hardware',  'Terminal Pro', 103, 3, 760),
  (4,  '2025-02-18', 'Software',  'Licencia SaaS', 101, 2, 1350),
  (5,  '2025-03-11', 'Servicios', 'Consultoría',  104, 2, 1750),
  (6,  '2025-03-26', 'Hardware',  'Terminal Pro', 105, 4, 1320),
  (7,  '2025-04-09', 'Software',  'Licencia SaaS', 106, 3, 2100),
  (8,  '2025-04-23', 'Hardware',  'Terminal Pro', 107, 2, 880),
  (9,  '2025-05-07', 'Servicios', 'Consultoría',  108, 3, 2650),
  (10, '2025-05-20', 'Software',  'Licencia SaaS', 109, 2, 1720),
  (11, '2025-06-10', 'Hardware',  'Terminal Pro', 110, 5, 1840),
  (12, '2025-06-24', 'Servicios', 'Consultoría',  111, 2, 1900),
  (13, '2025-07-08', 'Software',  'Licencia SaaS', 112, 4, 2850),
  (14, '2025-07-22', 'Hardware',  'Terminal Pro', 103, 3, 1160),
  (15, '2025-08-06', 'Servicios', 'Consultoría',  101, 3, 2950),
  (16, '2025-08-19', 'Software',  'Licencia SaaS', 104, 3, 2440),
  (17, '2025-09-09', 'Hardware',  'Terminal Pro', 105, 4, 1540),
  (18, '2025-09-23', 'Servicios', 'Consultoría',  106, 3, 3150),
  (19, '2025-10-07', 'Software',  'Licencia SaaS', 107, 5, 3780),
  (20, '2025-10-21', 'Hardware',  'Terminal Pro', 108, 3, 1280),
  (21, '2025-11-05', 'Servicios', 'Consultoría',  109, 4, 3960),
  (22, '2025-11-19', 'Software',  'Licencia SaaS', 110, 4, 3380),
  (23, '2025-12-08', 'Hardware',  'Terminal Pro', 111, 5, 2050),
  (24, '2025-12-18', 'Servicios', 'Consultoría', 112, 5, 4800);

-- Indicadores principales
SELECT
  SUM(ventas) AS ventas_totales,
  COUNT(DISTINCT cliente_id) AS clientes_activos,
  SUM(unidades) AS productos_vendidos
FROM ventas;

-- Ventas por mes para la gráfica de tendencia
SELECT
  strftime('%m', fecha) AS numero_mes,
  CASE strftime('%m', fecha)
    WHEN '01' THEN 'Enero' WHEN '02' THEN 'Febrero'
    WHEN '03' THEN 'Marzo' WHEN '04' THEN 'Abril'
    WHEN '05' THEN 'Mayo' WHEN '06' THEN 'Junio'
    WHEN '07' THEN 'Julio' WHEN '08' THEN 'Agosto'
    WHEN '09' THEN 'Septiembre' WHEN '10' THEN 'Octubre'
    WHEN '11' THEN 'Noviembre' WHEN '12' THEN 'Diciembre'
  END AS mes,
  SUM(ventas) AS ventas,
  COUNT(DISTINCT cliente_id) AS clientes,
  SUM(unidades) AS unidades
FROM ventas
GROUP BY strftime('%m', fecha)
ORDER BY numero_mes;

-- Participación de ventas por categoría
SELECT
  categoria,
  SUM(ventas) AS ventas,
  ROUND(SUM(ventas) * 100.0 / (SELECT SUM(ventas) FROM ventas), 1) AS participacion
FROM ventas
GROUP BY categoria
ORDER BY ventas DESC;

-- Crecimiento del segundo semestre contra el primero
WITH periodos AS (
  SELECT
    CASE WHEN CAST(strftime('%m', fecha) AS INTEGER) <= 6
      THEN 'Primer semestre'
      ELSE 'Segundo semestre'
    END AS periodo,
    SUM(ventas) AS ventas
  FROM ventas
  GROUP BY periodo
)
SELECT ROUND(
  (MAX(CASE WHEN periodo = 'Segundo semestre' THEN ventas END) -
   MAX(CASE WHEN periodo = 'Primer semestre' THEN ventas END)) * 100.0 /
   MAX(CASE WHEN periodo = 'Primer semestre' THEN ventas END), 1
) AS crecimiento_porcentual
FROM periodos;