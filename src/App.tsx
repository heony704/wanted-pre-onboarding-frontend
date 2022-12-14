import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TodoListPage from './pages/TodoListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />}/>
        <Route path="/todo" element={<TodoListPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
