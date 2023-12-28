import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TopBar from '../components/common/Topbar';

const mockHistory = [
  {
    id: 1,
    timestamp: '2023-01-01T12:00:00',
    username: 'user1',
    success: true,
    repositoriesCount: 10,
  },
  {
    id: 2,
    timestamp: '2023-01-02T15:30:00',
    username: 'user2',
    success: false,
    repositoriesCount: 0,
  },
];

const History = () => {
  const [history, setHistory] = useState(mockHistory);

  const handleDelete = (itemId) => {
    // Implementar a lógica de exclusão do item do histórico aqui
    // Atualizar o estado removendo o item correspondente
    setHistory(history.filter((item) => item.id !== itemId));
  };

  const handleUserDetails = (username) => {
    // Implementar a navegação para a tela de detalhes do usuário aqui
    // Exemplo de navegação para a tela de Repositories com base no username
    // Pode ser ajustado conforme a estrutura de rotas
    window.location.href = `/repositories?username=${username}`;
  };

  const handleRepositories = (username) => {
    // Implementar a navegação para a tela de Repositories aqui
    // Exemplo de navegação para a tela de Repositories com base no username
    // Pode ser ajustado conforme a estrutura de rotas
    window.location.href = `/repositories?username=${username}`;
  };

  return (
    <Container>
      <TopBar />
      <Typography variant="h5" gutterBottom>
        Search History
      </Typography>
      <List>
        {history.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="subtitle1">
                      {new Date(item.timestamp).toLocaleString()}
                    </Typography>
                    <Typography variant="h6" style={{ cursor: 'pointer' }} onClick={() => handleUserDetails(item.username)}>
                      {item.username}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body2">
                      Status: {item.success ? 'Success' : 'Not Found'}
                    </Typography>
                    <Typography variant="body2">
                      Repositories: {item.repositoriesCount}
                    </Typography>
                  </React.Fragment>
                }
              />
              <IconButton onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default History;
