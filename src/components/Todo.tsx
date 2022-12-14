import styled, { css } from "styled-components";
import { useState } from "react";
import { MdCheckCircle, MdEdit, MdDelete, MdCancel } from 'react-icons/md';

type TodoProps = {
    id?: number;
    contents?: string;
    isCompleted: boolean;
};

export default function Todo({ id, contents, isCompleted } : TodoProps) {
    const [editFlag, setEditFlag] = useState(false);
    
    const onEditMode = () => {
        setEditFlag(true);
    };
    const offEditMode = () => {
        setEditFlag(false);
    };
    
    const [value, setValue] = useState(contents);
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const access_token = localStorage.getItem("access_token");
    const deleteTodo = () => {
        if (access_token === null) return;
        fetch('https://pre-onboarding-selection-task.shop/todos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token,
            },
        })
        .then((response) => {
            if (!response.ok) throw new Error('네크워크 응답 오류');
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const updateTodo = () => {
        if (access_token === null) return;
        fetch('https://pre-onboarding-selection-task.shop/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token,
            },
            body: JSON.stringify({
                todo: value,
                isCompleted: isCompleted,
            }),
        })
        .then((response) => {
            if (!response.ok) throw new Error('네크워크 응답 오류');
            else offEditMode();
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const cancelEdit = () => {
        setValue(contents);
        offEditMode();
    };
    
    const switchCompleted = () => {
        fetch('https://pre-onboarding-selection-task.shop/todos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token,
            },
            body: JSON.stringify({
                todo: contents,
                isCompleted: !isCompleted,
            }),
        })
        .then((response) => {
            if (!response.ok) throw new Error('네크워크 응답 오류');
            else offEditMode();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    if (editFlag) {
        return (
            <Container isCompleted={isCompleted}>
                <textarea value={value} onChange={onChange} autoFocus spellCheck="false" />
                <button onClick={updateTodo}><MdCheckCircle /></button>
                <button onClick={cancelEdit}><MdCancel /></button>
            </Container>
        );
    } else {
        return (
            <Container isCompleted={isCompleted}>
                <pre onClick={switchCompleted}>{contents}</pre>
                <button onClick={onEditMode}><MdEdit /></button>
                <button onClick={deleteTodo}><MdDelete /></button>
            </Container>
        );
    }
}

interface ContainerProps {
    isCompleted: boolean;
}
const Container = styled.div<ContainerProps>`
    display: flex;
    background: white;
    border: 0.1rem solid silver;
    border-radius: 1.3rem;
    padding: 0.7rem 1.2rem;

    button {
        color: white;
        background-color: #3A62F4;
        height: 1.6rem;
        width: 2.3rem;
        border: none;
        font-size: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease-out;
        
        :hover {
            filter: brightness(1.2);
        }
    }
    button + button {
        margin-left: 0.5rem;
    }

    textarea {
        background: #f3f3f3;
        outline: none;
        border: none;
        margin-right: 10px;
        font-size: 1.125rem;
        font-family: sans-serif;
        line-height: 1.5;
        resize: none;
        color: black;
        height: 10rem;
        max-height: 20rem;
        flex: 1;
        border-radius: 0.3rem;
        word-break: break-all;
    }

    pre {
        margin-right: 0.5rem;
        cursor: pointer;
        flex: 1;
        background: none;
        outline: none;
        border: none;
        font-size: 1.125rem;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-all;
    }

    ${({ isCompleted }) =>
        isCompleted &&
        css`
            background: #e7e7e7;
            pre {
                color: #adb5bd;
                text-decoration: line-through;
            }
            textarea {
                color: #adb5bd;
                text-decoration: line-through;
            }
            button {
                background-color: #adb5bd;
            }
        `
    };
`;
