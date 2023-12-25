//components/CreateUserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { CreateUserFormContainer } from '../styles/CreateUserFormStyles';

const CreateUserForm = ({ onUserCreate }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
  });

  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    onUserCreate(formData);
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verificar se todos os campos estão preenchidos antes de enviar a requisição
      if (!formData.nome || !formData.cpf || !formData.email) {
        console.error('Todos os campos devem ser preenchidos');
        return;
      }

      // Fazer uma requisição POST para a API Django
      const response = await axios.post('http://localhost:8000/users/', formData);

      // Chamar a função passada como prop para adicionar o novo usuário ao estado
      onUserCreate(response.data);

      // Limpar o formulário
      setFormData({
        nome: '',
        cpf: '',
        email: '',
      });

      console.log('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error.response.data);
      //console.log('Mensagem da API:', error.response.data.message); // Adiciona a mensagem da API
      
      if (error.response.data.detail) {
        setErrorMessages([error.response.data.detail]);
      }
    }
  };

  return (
    <CreateUserFormContainer>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </label>
        <label>
          CPF:
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
        </label>
        <label>
          E-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        {errorMessages.length > 0 && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {errorMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        )}
        <button type="submit">Cadastrar</button>
      </form>
    </CreateUserFormContainer>
  );
};

export default CreateUserForm;
