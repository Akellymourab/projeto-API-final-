const autogen = require('swagger-autogen');

const arquivoSaida = './docs.json';
const endpoinsts = ['./server.js'];

autogen(arquivoSaida, endpoinsts);
