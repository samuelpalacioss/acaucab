-- Este script asegura que exista una tasa de cambio base para Bolívares (VES).
-- Es fundamental para que los pagos en la moneda local puedan ser registrados,
-- ya que la tabla 'pago' requiere una referencia a una tasa (fk_tasa).

-- Inserta la tasa base para VES con una equivalencia de 1, solo si no existe una.
-- Se utiliza una fecha de inicio muy antigua para asegurar que siempre sea una tasa válida disponible.
INSERT INTO tasa (moneda, monto_equivalencia, fecha_inicio, fecha_fin)
SELECT 'VES', 1.00, '2000-01-01', NULL
WHERE NOT EXISTS (
    SELECT 1 FROM tasa WHERE moneda = 'VES'
); 