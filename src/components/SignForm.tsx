import styled from "styled-components";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function SignForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const isValidEmailFormat = (email: string) => {
        const emailFormatRegex = /@{1}/;
        return emailFormatRegex.test(email);
    };
    const isValidPasswordCharacter = (password: string) => {
        return password.length > 7;
    };
    const isValidForm = (email: string, password: string) => {
        return isValidEmailFormat(email) && isValidPasswordCharacter(password);
    };

    const onSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        fetch('https://pre-onboarding-selection-task.shop/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                alert('잘못된 로그인입니다.');
                throw new Error('로그인 오류');
            }
            return res.json();
        })
        .then((data) => {
            localStorage.setItem("access_token", data.access_token);
            navigate('/todo');
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    const onSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        fetch('https://pre-onboarding-selection-task.shop/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                alert('이미 존재하는 이메일입니다.');
                throw new Error('회원가입 오류');
            }
            return res.json();
        })
        .then((data) => {
            localStorage.setItem("access_token", data.access_token);
            alert('성공적으로 회원가입되었습니다.\n다시 로그인해주세요.');
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <Form>
            <FormItem>
                <label>email</label>
                <div>
                    <input type="text" value={email} onChange={onChangeEmail} placeholder="example@exam.com" />
                    <InputCheck valid={isValidEmailFormat(email)}>이메일 형식으로 작성해주세요.</InputCheck>
                </div>
            </FormItem>
            <FormItem>
                <label>password</label>
                <div>
                    <input type="password" value={password} onChange={onChangePassword} placeholder="********" />
                    <InputCheck valid={isValidPasswordCharacter(password)}>8자 이상으로 작성해주세요.</InputCheck>
                </div>
            </FormItem>
            <Button disabled={!isValidForm(email, password)} onClick={onSignIn}>
                SIGNIN
            </Button>
            <hr/>
            <Button disabled={!isValidForm(email, password)} onClick={onSignUp}>
                SIGNUP
            </Button>
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 30rem;
    margin: auto;

    > * + * {
        margin-top: 1rem;
    }
`;

const FormItem = styled.div`
    display: flex;

    label {
        user-select: none;
        font-size: 1.1rem;
        width: 5rem;
    }

    > div {
        display: flex;
        flex-direction: column;
        padding-left: 1.5rem;
        flex: 1;
    }

    input {
        font-size: 1rem;
        padding: 0.5rem 0.7rem;
        background-color: white;
        border: 0.1rem solid #a1887f;
        border-radius: 0.8rem;

        ::placeholder {
            color: lightgray;
        }
    }
`;

interface ContainerProps {
    valid: boolean;
}
const InputCheck = styled.div<ContainerProps>`
    color: ${({ valid }) => valid ? 'lightgrey' : 'red'};
    margin-top: 0.3rem;
    padding-left: 0.3rem;
    font-size: 0.8rem;
    height: 1rem;
`;

const Button = styled.button`
    color: white;
    background-color: #3A62F4;
    border: none;
    font-size: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-out;

    :hover {
        filter: brightness(1.2);
    }

    :disabled {
        cursor: default;
        background-color: lightgray;
        :hover {
            filter: none;
        }
    }
`;
