import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 요청 전에 상태 변경
    setIsSubmitting(true);

    try {
      // 서버에 회원가입 요청
      const response = await axios.post('http://localhost:8080/api/users/register', {
        nickname: nickname,
        userId: userId,
        username: username,
        password: password
      });

      // 회원가입 성공 시 메시지 설정 및 입력 필드 초기화
      setMessage(response.data);
      setNickname('');
      setUserId('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      // 회원가입 실패 시 에러 메시지 출력
      setMessage('회원가입에 실패했습니다.');
      console.error(error);
    } finally {
      // 요청 완료 후 상태 변경
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="닉네임" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          required 
        />
        <br />
        <input 
          type="text" 
          placeholder="아이디" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          required 
        />
        <br />
        <input 
          type="text" 
          placeholder="실명" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <br />
        <input 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br />
        <input 
          type="password" 
          placeholder="비밀번호 확인" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <br />
        <button type="submit" disabled={isSubmitting}>회원가입</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
