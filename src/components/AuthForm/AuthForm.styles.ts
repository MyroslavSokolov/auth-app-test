import styled from 'styled-components';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 315px;
`;

export const SignUpTxt = styled.p`
    font-size: 28px;
    font-weight: 700;
    line-height: 28px;
    color: #4A4E71;
    text-align: center;
`;

export const Input = styled.input<{ isError: boolean }>`
    width: 315px;
    height: 48px;
    padding: 10px 10px 10px 20px;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid ${({ isError }) => (isError ? '#FF0000' : '#aaa')};
    background-color: ${({ isError }) => (isError ? 'rgba(255, 0, 0, 0.65)' : 'white')};
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;

    &:focus {
        border-color: ${({ isError }) => (isError ? '#FF0000' : '#007bff')};
    }
`;

export const EmailInput = styled(Input)`

`;

export const PasswordContainer = styled.div`
    position: relative;
    margin-top: 20px;
`;

export const PasswordInput = styled(Input)`
`;

export const ShowHidePasswordToggle = styled.div`
    cursor: pointer;
    position: absolute;
    top: 60%;
    right: 15px;
    transform: translateY(-60%);
`;

export const PasswordRulesContainer = styled.div`
    text-align: left;
    padding: 0 20px;
    margin-top: 20px;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #4A4E71;
`;

export const SignUpButton = styled.button`
    width: 240px;
    height: 48px;
    padding: 15px 32px 15px 32px;
    gap: 10px;
    border-radius: 30px;
    background: linear-gradient(110.46deg, #70C3FF 12.27%, #4B65FF 93.92%);
    border: none;
    cursor: pointer;
    margin-top: 156px;

    font-size: 16px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    color: white;
`;