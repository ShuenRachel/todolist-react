import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, checkPermission } from '../api/auth.js';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function checkTokenIsValid() {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) return;

        const isAuthorized = await checkPermission(authToken);

        if (isAuthorized) {
          navigate('/todos');
        }
      } catch (e) {
        console.log(e);
      }
    }

    checkTokenIsValid();
  }, [navigate]);

  function handleUsernameInput(usernameInput) {
    setUsername(usernameInput);
  }

  function handleEmailInput(emailInput) {
    setEmail(emailInput);
  }

  function handlePasswordInput(passwordInput) {
    setPassword(passwordInput);
  }

  async function handleSignUp() {
    try {
      if (
        !username.trim().length ||
        !email.trim().length ||
        !password.trim().length
      ) {
        return;
      }

      const { success, authToken } = await signup({
        username,
        email,
        password,
      });

      if (success) {
        localStorage.setItem('authToken', authToken);

        Swal.fire({
          position: 'top',
          title: '註冊成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });

        navigate('/todos');

        return;
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        position: 'top',
        title: '註冊失敗！',
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
      <h1>建立您的帳號</h1>

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
          label="Email"
          value={email}
          placeholder="Please input email"
          onChange={(emailInput) => handleEmailInput(emailInput)}
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
      <AuthButton onClick={handleSignUp}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
