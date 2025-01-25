import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { emailRegex } from '../../utils/regex';
import {
  EmailInput,
  FormContainer,
  PasswordContainer,
  PasswordInput,
  InputRulesContainer,
  ShowHidePasswordToggle,
  SignUpButton,
  SignUpTxt,
} from './AuthForm.styles';
import SuccessScreen from '../SuccessScreen/SuccessScreen';
import HidePasswordIcon from '../icons/HidePasswordIcon.tsx';
import ShowPasswordIcon from '../icons/ShowPasswordIcon.tsx';

const INVALID_EMAIL_ADDRESS = 'Invalid email address';

const AuthForm: React.FC = () => {
  const theme = useTheme();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ruleColors, setRuleColors] = useState<string[]>([
    theme.colors.borderDefault,
    theme.colors.borderDefault,
    theme.colors.borderDefault,
  ]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const passwordRules = [
    {
      text: '8 characters or more (no spaces)',
      validate: (password: string) => password.length >= 8 && !password.includes(' '),
    },
    {
      text: 'Uppercase and lowercase letters',
      validate: (password: string) => /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    { text: 'At least one digit', validate: (password: string) => /\d/.test(password) },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!emailRegex.test(email)) {
      setHasEmailError(true);
      isValid = false;
    } else {
      setHasEmailError(false);
    }

    // Validate password
    const passwordErrors = passwordRules
      .filter((rule) => !rule.validate(password))
      .map((rule) => rule.text);

    if (passwordErrors.length > 0) {
      setHasPasswordError(true);
      setRuleColors(ruleColors.map((_, index) => (passwordErrors.includes(passwordRules[index].text) ? theme.colors.error : theme.colors.success)));
      isValid = false;
    } else {
      setHasPasswordError(false);
      setRuleColors(ruleColors.map(() => theme.colors.success));
    }

    return isValid;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      console.log('Form Submitted', { email, password });
      setIsSuccess(true);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const updatedColors = passwordRules.map((rule) =>
      rule.validate(newPassword) ? theme.colors.success : theme.colors.borderDefault,
    );

    setRuleColors(updatedColors);

    if (passwordRules.every((rule) => rule.validate(newPassword))) {
      setHasPasswordError(false);
    } else {
      setHasPasswordError(true);
    }
  };

  if (isSuccess) return <SuccessScreen />;

  return (
    <FormContainer>
      <SignUpTxt>Sign Up</SignUpTxt>
      <div>
        <EmailInput
          value={email}
          placeholder="example@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
            if (!emailRegex.test(e.target.value)) {
              setHasEmailError(true);
            } else {
              setHasEmailError(false);
            }
          }}
          isError={hasEmailError}
        />
        <InputRulesContainer>
          {hasEmailError && <p style={{ color: theme.colors.error }}>{INVALID_EMAIL_ADDRESS}</p>}
        </InputRulesContainer>

        <PasswordContainer>
          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create your password"
            isError={hasPasswordError}
          />
          <ShowHidePasswordToggle onClick={togglePasswordVisibility} aria-label="Toggle Password">
            {showPassword ? (
              <HidePasswordIcon fill={hasPasswordError ? theme.colors.error : theme.colors.borderDefault} />
            ) : (
              <ShowPasswordIcon fill={hasPasswordError ? theme.colors.error : theme.colors.borderDefault} />
            )}
          </ShowHidePasswordToggle>
        </PasswordContainer>

        <InputRulesContainer>
          {passwordRules.map((rule, index) => (
            <p key={index} style={{ color: ruleColors[index] }}>
              {rule.text}
            </p>
          ))}
        </InputRulesContainer>

        <SignUpButton type="button" onClick={handleSubmit}>
          Sign Up
        </SignUpButton>
      </div>
    </FormContainer>
  );
};

export default AuthForm;