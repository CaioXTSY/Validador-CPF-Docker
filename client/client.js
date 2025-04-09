const axios = require('axios');

// exemplo de CPF para teste
const cpf = "12345678909";

async function validateCPF() {
  try {
    // 'server' é o nome do serviço definido no docker-compose
    const response = await axios.get(`http://server:3000/validate`, { params: { cpf } });
    console.log(`CPF: ${response.data.cpf}`);
    console.log(`Válido: ${response.data.valid}`);
  } catch (error) {
    console.error('Erro ao validar o CPF:', error.message);
  }
}

validateCPF();
