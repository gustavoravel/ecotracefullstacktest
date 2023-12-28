import api from './api';

const login = async (credentials) => {
  try {
    const response = await api.post('token/', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default login;
