// components/Modal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ModalContainer } from '../styles/ModalStyles';

const Modal = ({ isOpen, onClose, onEdit, onDelete, selectedUser }) => {
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    setEditedUser(selectedUser);
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      // Fazer uma requisição PATCH para a API Django
    await axios.patch(`http://localhost:8000/users/${editedUser.id}/`, editedUser);

    // Chamar a função passada como prop para editar o usuário no estado
    onEdit(editedUser);
    onClose();

    console.log('Usuário editado com sucesso!');
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    console.log('Mensagem da API:', error.response.data.message); // Adiciona a mensagem da API
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      // Fazer uma requisição DELETE para a API Django
      await axios.delete(`http://localhost:8000/users/${selectedUser.id}/`);

      // Chamar a função passada como prop para excluir o usuário do estado
      onDelete(selectedUser.id);
      onClose();

      console.log('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      console.log('Mensagem da API:', error.response.data.message); // Adiciona a mensagem da API
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <h3>Editar/Excluir Usuário</h3>
      <form>
        <label>
          Nome:
          <input type="text" name="nome" value={editedUser.nome || ''} onChange={handleInputChange} />
        </label>
        <label>
          CPF:
          <input type="text" name="cpf" value={editedUser.cpf || ''} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={editedUser.email || ''} onChange={handleInputChange} />
        </label>
        {/* Adicionar outros campos de edição conforme necessário */}
        <button type="button" onClick={handleEditSubmit}>
          Salvar Edição
        </button>
        <button type="button" onClick={handleDeleteSubmit}>
          Excluir usuário
        </button>
      </form>
    </ModalContainer>
  );
};

export default Modal;

