import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { emailRegex } from '../../utils/regex';
import {
  EmailInput,
  FormContainer,
  PasswordContainer,
  PasswordInput,
  PasswordRulesContainer,
  ShowHidePasswordToggle,
  SignUpButton,
  SignUpTxt,
} from './AuthForm.styles';
import SuccessScreen from '../SuccessScreen/SuccessScreen';
import HidePasswordIcon from '../icons/HidePasswordIcon.tsx';
import ShowPasswordIcon from '../icons/ShowPasswordIcon.tsx';

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

  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ruleColors, setRuleColors] = useState<string[]>(['#aaa', '#aaa', '#aaa']); // Colors for password rules

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
    const passwordErrors = validatePassword(data.password);
    const passwordErrors = passwordRules
      .filter((rule) => !rule.validate(data.password))
      .map((rule) => rule.text);

    if (!emailRegex.test(data.email)) {
      setError('email', { type: 'manual', message: 'Invalid email address' });
    }

    if (passwordErrors.length > 0) {
      setError('password', { type: 'manual', message: passwordErrors.join(', ') });
      setRuleColors(ruleColors.map((_, index) => (passwordErrors.includes(passwordRules[index].text) ? '#FF0000' : '#27B274B2')));
    } else {
      setRuleColors(ruleColors.map(() => '#27B274B2'));
    }

    if (!errors.email && !errors.password && passwordErrors.length === 0) {
      console.log('Form Submitted', data);
      setIsSuccess(true);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    const updatedColors = passwordRules.map((rule) =>
      rule.validate(password) ? '#27B274B2' : '#aaa',
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
              setError('email', { type: 'manual', message: 'Invalid email format' });
            } else {
              clearErrors('email');
            }
          }}
          isError={!!errors.email}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <br />
        {/*<PasswordInput*/}
        {/*  {...register('password', { required: 'Password is required' })}*/}
        {/*  placeholder="Password"*/}
        {/*  type="password"*/}
        {/*  onChange={handlePasswordChange}*/}
        {/*/>*/}

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
              <HidePasswordIcon fill={errors.password ? '#FF0000' : '#aaa'} />
            ) : (
              <ShowPasswordIcon fill={errors.password ? '#FF0000' : '#aaa'} />
            )}
          </ShowHidePasswordToggle>
        </PasswordContainer>

        <PasswordRulesContainer>
          {passwordRules.map((rule, index) => (
            <p key={index} style={{ color: ruleColors[index] }}>
              {rule.text}
            </p>
          ))}
        </PasswordRulesContainer>

        <SignUpButton type="submit">Sign Up</SignUpButton>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
