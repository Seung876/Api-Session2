import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  margin-bottom: 5px;
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

const Signup = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      alert('아이디와 비밀번호는 필수 입력 사항입니다.');
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/api/user/signup`, {
        userId,
        password,
        email,
      });

      if (response.status === 200) {
        alert('회원가입 성공!!');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('이미 사용 중인 아이디입니다.');
      } else {
        alert('회원가입 실패. 다시 시도해 주세요.');
      }
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <FormWrapper>
      <Title>회원가입</Title>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="*아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Input type="password" placeholder="*비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Note>* 부분은 필수 입력란입니다.</Note>
        <Button type="submit">회원가입 완료</Button>
      </form>
    </FormWrapper>
  );
};

export default Signup;
