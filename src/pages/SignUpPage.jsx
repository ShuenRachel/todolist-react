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

const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameInput(userNameInput) {}

  function handleEmailInput(emailInput) {}

  function handlePasswordInput(passwordInput) {}

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

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
      <AuthButton>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
