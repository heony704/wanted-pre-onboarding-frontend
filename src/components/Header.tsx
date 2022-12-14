import styled from "styled-components";

export default function Header() {
    return (
        <Container>
            <span>todolist</span>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    
    user-select: none;
    font-size: 1.5rem;
    font-weight: 700;
`;