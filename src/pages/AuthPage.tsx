import styled from 'styled-components';
import Header from '../components/Header';
import SignForm from '../components/SignForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("access_token"))  {
            navigate('/todo');
        }
    });

    return (
        <Container>
            <Header />
            <SignForm />
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
    max-width: 50rem;
    margin: 0 auto;
    padding: 0 2rem;
`;