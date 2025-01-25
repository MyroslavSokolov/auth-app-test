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

export const Input = styled.input`
    //width: 100%;
    //padding: 10px;
    //margin: 10px 0;
    //border: 1px solid #ccc;
    //border-radius: 4px;

    //width: 311px;
    //height: 56px;
    //top: 528px;
    //left: 140px;
    //gap: 0px;
    //border-radius: 60px;
    //border: 2px 0px 0px 0px;

    width: 315px;
    height: 48px;
    padding: 10px 10px 10px 20px;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid #ccc; // TODO fix here
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;

    &:focus {
        border-color: #007bff;
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

export const ShowHidePasswordButton = styled.div<{ iconColor: string }>`
    cursor: pointer;
    position: absolute;
    top: 60%;
    right: 15px;
    transform: translateY(-60%);

    // svg {
        //   fill: ${({ iconColor }) => iconColor};
    //   width: 20px;
    //   height: 20px;
    //   transition: fill 0.3s ease;
    // }
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