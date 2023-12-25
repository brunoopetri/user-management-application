// App.js
import React, { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import { MainContainer, Footer } from './styles/ContainerStyles';
import CreateUserForm from './components/CreateUserForm';
import Modal from './components/Modal';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserCreate = (userData) => {
    // Adicione o novo usuário à lista
    setUsers((prevUsers) => [...prevUsers, { ...userData, id: Date.now() }]);
  };

  const handleUserEdit = (editedUser) => {
    // Edite o usuário na lista
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
  };

  const handleUserDelete = (userId) => {
    // Remova o usuário da lista
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleEditClick = (userId) => {
    // Abra o modal com o usuário selecionado para edição
    const userToEdit = users.find((user) => user.id === userId);
    setSelectedUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Feche o modal e limpe o usuário selecionado
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <CreateUserForm onUserCreate={handleUserCreate} />
        <UserList users={users} onEdit={handleEditClick} onDelete={handleUserDelete} />
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onEdit={handleUserEdit}
          onDelete={handleUserDelete}
          selectedUser={selectedUser}
        />
      </MainContainer>
      <Footer>
        <p>© Bruno Petri</p>
      </Footer>
    </>
  );
};

export default App;

