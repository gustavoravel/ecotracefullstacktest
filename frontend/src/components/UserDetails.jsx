import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TopBar from '../components/common/Topbar'; 
//import EditProfileModal from './EditProfileModal'; // Criar este componente para a edição do perfil

const UserDetails = ({ currentUser, logout }) => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Simular dados do usuário consultado.
  const fetchUserData = async () => {
    try {
      // Implementar a lógica de busca do usuário no GitHub aqui
      // Substituir pelo código necessário para obter os dados do usuário consultado
      const fetchedData = { /* Dados do usuário consultado */ };
      setUserData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  useEffect(() => {
    setIsCurrentUser(currentUser.username === username);
  }, [currentUser, username]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Implementar a lógica de logout aqui
    logout();
    navigate('/login');
  };

  const renderProfileData = () => {
    // Renderizar os dados do perfil
    // Substituir pelos campos reais do seu modelo e ajuste conforme necessário
    return (
      <div>
        <Typography variant="h5">{userData.name}</Typography>
        <Typography variant="subtitle1">{userData.tag}</Typography>
        <Typography variant="body1">Followers: {userData.followers}</Typography>
        <Typography variant="body1">Following: {userData.following}</Typography>
        <Typography variant="body1" onClick={() => navigate(`/repositories?username=${userData.tag}`)}>
          Repositories: {userData.publicRepos}
        </Typography>
        {userData.bio && <Typography variant="body2">Bio: {userData.bio}</Typography>}
        {userData.email && <Typography variant="body2">Email: {userData.email}</Typography>}
        {userData.twitter && (
          <Typography variant="body2" onClick={() => window.open(`https://twitter.com/${userData.twitter}`, '_blank')}>
            Twitter: {userData.twitter}
          </Typography>
        )}
        {userData.company && <Typography variant="body2">Company: {userData.company}</Typography>}
        {userData.website && (
          <Typography variant="body2" onClick={() => window.open(userData.website, '_blank')}>
            Website: {userData.website}
          </Typography>
        )}
      </div>
    );
  };

  return (
    <Container>
      <TopBar />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h4">User Details</Typography>
        {userData ? (
          <>
            {renderProfileData()}
            {isCurrentUser && (
              <Button variant="contained" onClick={handleEdit} style={{ marginRight: '10px' }}>
                Edit Profile
              </Button>
            )}
            <Button variant="contained" onClick={() => navigate(`/repositories?username=${userData.tag}`)}>
              View Repositories
            </Button>
            {isCurrentUser ? (
              <Button variant="contained" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                Logout
              </Button>
            ) : null}
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </div>
      {/*<EditProfileModal open={isEditing} onClose={handleCloseEditModal} />*/}
    </Container>
  );
};

export default UserDetails;
