import styled from 'styled-components';
import Header from '../components/Header';
import SignForm from '../components/SignForm';

export default function AuthPage() {
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
`;