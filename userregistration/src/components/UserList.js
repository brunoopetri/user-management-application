// components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserListContainer, UserInfoContainer, IconsContainer } from '../styles/UserListStyles';
import Modal from './Modal';

const UserList = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Função para obter a lista de usuários da API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao obter lista de usuários:', error);
        console.log('Mensagem da API:', error.response.data.message); // Adiciona a mensagem da API
      }
    };

    // Chama a função para obter a lista de usuários quando o componente monta
    fetchUsers();
  }, []); // O segundo parâmetro vazio [] garante que o efeito só seja executado uma vez, ao montar o componente

  return (
    <UserListContainer>
      <h2>Lista de Usuários</h2>
      {users.map((user) => (
        <div key={user.id}>
          <UserInfoContainer>
            <div>
              <p>
                {user.nome} {user.sobrenome}
              </p>
              <p>CPF: {user.cpf}</p>
              <p>E-mail: {user.email}</p>
            </div>
            <IconsContainer>
              <span onClick={() => setSelectedUser(user)}>✏️</span>
              <span onClick={() => setSelectedUser(user)}>❌</span>
            </IconsContainer>
          </UserInfoContainer>
        </div>
      ))}

      {selectedUser && (
        <Modal
          isOpen={true} // Pode ser baseado em algum estado para controle
          onClose={() => setSelectedUser(null)}
          onEdit={(editedUser) => {
            // Lógica para atualizar o usuário na lista após a edição
            const updatedUsers = users.map((user) =>
              user.id === editedUser.id ? editedUser : user
            );
            setUsers(updatedUsers);
          }}
          onDelete={(userId) => {
            // Lógica para remover o usuário excluído da lista
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
          }}
          selectedUser={selectedUser}
        />
      )}
    </UserListContainer>
  );
};

export default UserList;

