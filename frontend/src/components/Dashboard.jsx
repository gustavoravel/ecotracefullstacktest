import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Repositories from './Repositories'; 
import TopBar from './common/TopBar';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Implementar a lógica de pesquisa do usuário aqui
    // chamada à API para obter os repositórios do usuário
    // Após a pesquisa, navegue para a página de Repositories com os resultados
    navigate(`/repositories?username=${username}`);
  };

  const handleHistory = () => {
    // Implementa a navegação para a página de histórico aqui
    navigate('/history');
  };

  return (
    <Container>
      <TopBar />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="outlined" onClick={handleHistory}>
          History
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;
