import styled from 'styled-components';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodoListPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("access_token"))  {
            navigate('/');
        }
    });

    return (
        <Container>
            <Header />
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
    max-width: 50rem;
    margin: 0 auto;
`;
