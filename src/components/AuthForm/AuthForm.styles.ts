import styled from 'styled-components';
import dbStars from '../../assets/bgStars.png';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 315px;
    background-color: #CFE1F4;
    background-image: url(${dbStars});
    background-blend-mode: overlay;
    background-position: center;
    padding: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SignUpTxt = styled.p`
    font-size: 28px;
    font-weight: 700;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-align: center;
`;

export const Input = styled.input<{ $isError: boolean; $isSuccess?: boolean }>`
    width: 315px;
    height: 48px;
    padding: 1px 20px;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid
    ${({ theme, $isError, $isSuccess }) =>
            $isError ? theme.colors.error : $isSuccess ? theme.colors.success : theme.colors.borderDefault};
    background-color: ${({ theme, $isError, $isSuccess }) =>
            $isError ? theme.colors.backgroundError : $isSuccess ? theme.colors.backgroundSuccess : theme.colors.backgroundDefault};
    color: ${({ theme, $isError, $isSuccess }) =>
            $isError ? theme.colors.error : $isSuccess ? theme.colors.success : theme.colors.borderDefault};
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;

    &:focus {
        border-color: ${({ theme, $isSuccess }) => ($isSuccess ? theme.colors.success : theme.colors.borderFocus)};
        background-color: ${({ theme, $isSuccess }) =>
                $isSuccess ? theme.colors.backgroundSuccess : theme.colors.backgroundDefault};
        color: ${({ theme, $isSuccess }) => ($isSuccess ? theme.colors.success : theme.colors.borderFocus)};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.colors.disabledBackground};
        color: ${({ theme }) => theme.colors.disabledText};
        border-color: ${({ theme }) => theme.colors.disabledBorder};
        cursor: not-allowed;
    }
`;

export const EmailInput = styled(Input)``;

export const PasswordContainer = styled.div`
    position: relative;
    margin-top: 20px;
`;

export const PasswordInput = styled(Input)``;

export const ShowHidePasswordToggle = styled.div`
    cursor: pointer;
    position: absolute;
    top: 60%;
    right: 15px;
    transform: translateY(-60%);
`;

export const InputRulesContainer = styled.div`
    text-align: left;
    padding: 0 20px;
    margin-top: 20px;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SignUpButton = styled.button`
    width: 240px;
    height: 48px;
    padding: 15px 32px 15px 32px;
    gap: 10px;
    border-radius: 30px;
    background: linear-gradient(110.46deg, ${({ theme }) => theme.colors.primary} 12.27%, ${({ theme }) => theme.colors.secondary} 93.92%);
    border: none;
    cursor: pointer;
    margin-top: 156px;

    font-size: 16px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    color: white;
`;
