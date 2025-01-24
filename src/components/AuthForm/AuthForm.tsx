import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validatePassword } from '../../hooks/useValidation';
import { emailRegex } from '../../utils/regex';
import { FormContainer, Input, Button } from './AuthForm.styles';
import SuccessScreen from '../SuccessScreen/SuccessScreen';

interface FormData {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const [isSuccess, setIsSuccess] = useState(false);

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

  if (isSuccess) return <SuccessScreen />;

  return (
    <FormContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <Input
          {...register('password', { required: 'Password is required' })}
          placeholder="Password"
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}

        <Button type="submit">Sign Up</Button>
      </form>
    </FormContainer>
  );
};

export default AuthForm;