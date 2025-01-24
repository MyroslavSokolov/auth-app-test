import React from 'react';
import { SuccessContainer, Message, SubMessage } from './SuccessScreen.styles';

const SuccessScreen: React.FC = () => {
  return (
    <SuccessContainer>
      <Message>Sign Up Successful!</Message>
      <SubMessage>Thank you for signing up. You can now log in and start using the application.</SubMessage>
    </SuccessContainer>
  );
};

export default SuccessScreen;