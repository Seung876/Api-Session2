import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormWrapper = styled.div`
  width: 290px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 92%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Note = styled.p`
  font-size: 12px;
  color: #555;
  text-align: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 90%;
  margin: 15px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      alert('아이디와 비밀번호는 필수 입력 사항입니다.');
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/api/user/login`, {
        userId,
        password,
      });

      if (response.status === 200) {
        const userId = response.data; // 서버에서 userId를 받아온다고 가정
        console.log("응답 데이터:", response.data);
        alert(`로그인 성공!! 사용자 고유 ID: ${userId}`);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패. 아이디나 비밀번호를 확인해 주세요.');
    }
  };

  return (
    <FormWrapper>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="*아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Input type="password" placeholder="*비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Note>* 부분은 필수 입력란입니다.</Note>
        <Button type="submit">로그인 완료</Button>
      </form>
    </FormWrapper>
  );
};

export default Login;
