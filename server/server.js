const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0, remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

app.get('/validate', (req, res) => {
  const { cpf } = req.query;
  if (!cpf) {
    return res.status(400).json({ error: 'CPF não fornecido' });
  }
  const valid = isValidCPF(cpf);
  return res.json({ cpf, valid });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
