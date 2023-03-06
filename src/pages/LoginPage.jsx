import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api/auth.js';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameInput(usernameInput) {
    setUsername(usernameInput);
  }

  function handlePasswordInput(passwordInput) {
    setPassword(passwordInput);
  }

  async function handleLogin() {
    try {
      if (!username.trim().length || !password.trim().length) {
        return;
      }

      const { success, authToken } = await login({ username, password });

      if (success) {
        localStorage.setItem('authToken', authToken);

        Swal.fire({
          position: 'top',
          title: '登入成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });

        return;
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
    }
  }

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="Username"
          value={username}
          placeholder="Please input usename"
          onChange={(usernameInput) => handleUsernameInput(usernameInput)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="Password"
          value={password}
          placeholder="Please input password"
          onChange={(passwordInput) => handlePasswordInput(passwordInput)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleLogin}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
