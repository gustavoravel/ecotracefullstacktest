import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TopBar from './common/TopBar'; 

const mockRepositories = [
  {
    id: 1,
    name: 'repo1',
    description: 'Description of repo1',
    language: 'JavaScript',
    owner: 'user1',
  },
  {
    id: 2,
    name: 'repo2',
    description: null,
    language: 'Python',
    owner: 'user1',
  },
];

const Repositories = () => {
  const [repositories, setRepositories] = useState(mockRepositories);

  const handleRefresh = () => {
    // Implementar a lógica de recarregar os repositórios aqui (pode ser uma chamada à API)
    // Atualizar o estado com os novos dados
    setRepositories(/* Novos dados dos repositórios */);
  };

  return (
    <Container>
      <TopBar />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Repositories
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          User: <Link href="/user-profile">{/* Link para a página do usuário */}user1</Link>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Repositories: {repositories.length}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>

        <List>
          {repositories.map((repo) => (
            <React.Fragment key={repo.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      <Link href={`https://github.com/${repo.owner}`} target="_blank" rel="noopener noreferrer">
                        {repo.owner}
                      </Link> / {repo.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      {repo.description ? (
                        repo.description
                      ) : (
                        <Typography color="textSecondary">No description available</Typography>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Repositories;
