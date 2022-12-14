import styled from 'styled-components';
import Header from '../components/Header';

export default function AuthPage() {
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