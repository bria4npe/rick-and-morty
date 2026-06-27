export function validatePage(req, res, next) {
  const { page } = req.query;

  if (page !== undefined) {
    const parsed = parseInt(page, 10);
    if (isNaN(parsed) || parsed < 1) {
      res.status(400).json({ error: 'El parámetro "page" debe ser un número entero positivo.' });
      return;
    }
  }

  next();
}

export function validateId(req, res, next) {
  const parsed = parseInt(req.params.id, 10);

  if (isNaN(parsed) || parsed < 1) {
    res.status(400).json({ error: "El id debe ser un número entero positivo." });
    return;
  }

  next();
}
