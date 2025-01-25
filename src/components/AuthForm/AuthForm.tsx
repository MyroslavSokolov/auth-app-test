import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

interface FormData {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const theme = useTheme();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ruleColors, setRuleColors] = useState<string[]>([
    theme.colors.borderDefault,
    theme.colors.borderDefault,
    theme.colors.borderDefault,
  ]);

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

  const onSubmit = (data: FormData) => {
    const passwordErrors = passwordRules
      .filter((rule) => !rule.validate(data.password))
      .map((rule) => rule.text);

    if (!emailRegex.test(data.email)) {
      setError('email', { type: 'manual', message: INVALID_EMAIL_ADDRESS });
    }

    if (passwordErrors.length > 0) {
      setError('password', { type: 'manual', message: passwordErrors.join(', ') });
      setRuleColors(ruleColors.map((_, index) => (passwordErrors.includes(passwordRules[index].text) ? theme.colors.error : theme.colors.success)));
    } else {
      setRuleColors(ruleColors.map(() => theme.colors.success));
    }

    if (!errors.email && !errors.password && passwordErrors.length === 0) {
      console.log('Form Submitted', data);
      setIsSuccess(true);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    const updatedColors = passwordRules.map((rule) =>
      rule.validate(password) ? theme.colors.success : theme.colors.borderDefault,
    );

    setRuleColors(updatedColors);

    if (passwordRules.every((rule) => rule.validate(password))) {
      clearErrors('password');
    } else {
      setError('password', { type: 'manual', message: 'Invalid password' });
    }
  };

  if (isSuccess) return <SuccessScreen />;

  return (
    <FormContainer>
      <SignUpTxt>Sign Up</SignUpTxt>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          {...register('email', { required: 'Email is required' })}
          placeholder="example@emai.com"
          onChange={(e) => {
            const email = e.target.value;
            if (!emailRegex.test(email)) {
              setError('email', { type: 'manual', message: INVALID_EMAIL_ADDRESS });
            } else {
              clearErrors('email');
            }
          }}
          isError={!!errors.email}
        />
        <InputRulesContainer>
          {errors.email && <p style={{ color: theme.colors.error }}>{errors.email.message}</p>}
        </InputRulesContainer>


        <PasswordContainer>
          <PasswordInput
            {...register('password', { required: 'Password is required' })}
            onChange={handlePasswordChange}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create your password"
            isError={!!errors.password}
          />
          <ShowHidePasswordToggle onClick={togglePasswordVisibility} aria-label="Toggle Password">
            {showPassword ? (
              <HidePasswordIcon fill={errors.password ? theme.colors.error : theme.colors.borderDefault} />
            ) : (
              <ShowPasswordIcon fill={errors.password ? theme.colors.error : theme.colors.borderDefault} />
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

        <SignUpButton type="submit">Sign Up</SignUpButton>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
