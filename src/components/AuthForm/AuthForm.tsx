import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validatePassword } from '../../hooks/useValidation';
import { emailRegex } from '../../utils/regex';
import {
  EmailInput,
  FormContainer, PasswordContainer,
  PasswordInput,
  PasswordRulesContainer,
  SignUpButton,
  SignUpTxt, ShowHidePasswordButton,
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
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);
  const [iconColor, setIconColor] = useState('#aaa'); // Default icon color

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    setIconColor(showPassword ? '#aaa' : '#007bff'); // Change color on toggle
  };

  const onSubmit = (data: FormData) => {
    const passwordErrors = validatePassword(data.password);
    if (!emailRegex.test(data.email)) {
      setError('email', { type: 'manual', message: 'Invalid email address' });
    }
    if (passwordErrors.length > 0) {
      setError('password', { type: 'manual', message: passwordErrors.join(', ') });
    }

    if (!errors.email && !errors.password) {
      console.log('Form Submitted', data);
      setIsSuccess(true);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (!emailRegex.test(email)) {
      setError('email', { type: 'manual', message: 'Invalid email format' });
    } else {
      clearErrors('email');
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const errors = validatePassword(password);
    setPasswordValidationErrors(errors);

    if (errors.length > 0) {
      setError('password', { type: 'manual', message: 'Invalid password' });
    } else {
      clearErrors('password');
    }
  };

  if (isSuccess) return <SuccessScreen />;

  return (
    <FormContainer>
      <SignUpTxt>Sign Up</SignUpTxt>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
          onChange={handleEmailChange}
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
            onFocus={() => setIconColor('#007bff')}
            onBlur={() => setIconColor('#aaa')}
          />
          <ShowHidePasswordButton onClick={togglePasswordVisibility} iconColor={iconColor} aria-label="Toggle Password">
            {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </ShowHidePasswordButton>
        </PasswordContainer>


        <div>
          {passwordValidationErrors.map((error, index) => (
            <span key={index} style={{ color: 'red', display: 'block' }}>
              {error}
            </span>
          ))}
        </div>
        {errors.password && <span>{errors.password.message}</span>}

        <PasswordRulesContainer>
          {/*TODO extract to function*/}
          <span>8 characters or more (no spaces)</span>
          <br />
          <span>Uppercase and lowercase letters</span>
          <br />
          <span>At least one digit</span>
          <br />
        </PasswordRulesContainer>


        <SignUpButton type="submit">Sign Up</SignUpButton>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
