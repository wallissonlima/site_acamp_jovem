import axios from 'axios';

const consultaCnpj = axios.create({
  baseURL: `https://brasilapi.com.br/api/cnpj/v1`,
});

export default consultaCnpj;
