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

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameInput(userNameInput) {}

  function handlePasswordInput(passwordInput) {}

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="Username"
          value={userName}
          placeholder="Please input usename"
          onChange={(userNameInput) => handleUsernameInput(userNameInput)}
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
      <AuthButton>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
