// styles/UserListStyles.js
import styled from 'styled-components';

export const UserListContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;

  span {
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;