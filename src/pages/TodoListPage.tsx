import styled from 'styled-components';
import Header from '../components/Header';
import Todo from '../components/Todo';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowDown } from 'react-icons/io5';

type TodoType = {
    id: number;
    todo: string;
    isCompleted: boolean;
    userId: number;
};

export default function TodoListPage() {
    const access_token = localStorage.getItem("access_token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!access_token) navigate('/');
    });

    const [value, setValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onCreateTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!access_token) navigate('/');
        else if (value.trim().length === 0) alert("빈 내용입니다.");
        else {
            fetch('https://pre-onboarding-selection-task.shop/todos', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    todo: value,
                }),
            })
            .then((response) => {
                if (!response.ok) throw new Error('네크워크 응답 오류');
                else setValue('');
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    const [todoList, setTodoList] = useState<TodoType[]>([]);

    useEffect(() => {
        if (access_token) {
            fetch('https://pre-onboarding-selection-task.shop/todos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + access_token,
                },
            })
            .then((response) => {
                if (!response.ok) throw new Error('네크워크 응답 오류');
                return response.json();
            })
            .then((data) => {
                setTodoList(data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });

    return (
        <Container>
            <Header />
            <TodoInputForm>
                <input value={value} onChange={onChange} placeholder='여기에 Todo를 입력하세요.' autoFocus spellCheck="false" />
                <button onClick={onCreateTodo}><IoArrowDown /></button>
            </TodoInputForm>
            <TodoList>
                {todoList.slice(0).reverse().map((todo, index) => (
                    <Todo id={todo.id} contents={todo.todo} isCompleted={todo.isCompleted} key={index} />
                ))}
            </TodoList>
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
    max-width: 50rem;
    margin: 0 auto;
    padding: 0 2rem;
`;

const TodoInputForm = styled.form`
    display: flex;
    border: 2px solid silver;
    border-radius: 1.3rem;

    input {
        background: none;
        outline: none;
        border: none;
        margin: 0.7rem 0 0.7rem 1.2rem;
        font-size: 1.125rem;
        line-height: 1.5;
        resize: none;
        word-break: break-all;
        &::placeholder {
            color: darkgray;
        }
        flex: 1;
    }

    button {
        background: none;
        outline: none;
        border: none;
        color: darkgray;
        padding: 0 1.6rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-out;
        &:hover {
            color: #bdc3cc;
        }
    }
`;

const TodoList = styled.div`
    margin: 1.5rem 0;
    width: 100%;

    > div + div {
        margin-top: 1rem;
    }
`;
