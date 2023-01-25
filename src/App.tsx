import React, { useEffect, useState } from 'react';
import './App.scss';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import {
  createTodo,
  deleteTodoById,
  getTodosByUserId,
  getUserById,
  updateTodo as updateTodoOnServer,
} from './api/apiClient';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = 4181;

    getTodosByUserId(userId)
      .then((todosFromServer) => setTodos(todosFromServer));

    getUserById(userId)
      .then((userFromServer) => setUser(userFromServer));
  }, []);

  const addTodo = async (todoData: Omit<Todo, 'id'>) => {
    try {
      const newTodo = await createTodo(todoData);

      setTodos(currentTodos => [...currentTodos, newTodo]);
    } catch (e) {
      window.alert(String(e));
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      const responseResult = await deleteTodoById(todoId);

      setTodos(currentTodos => currentTodos.filter(
        todo => todo.id !== todoId,
      ));

      return responseResult;
    } catch (e) {
      window.alert(String(e));

      return false;
    }
  };

  const updateTodo = async (todoToUpdate: Todo) => {
    try {
      const {
        id,
        ...fieldsToUpdate
      } = todoToUpdate;

      const updatedTodo = await updateTodoOnServer(id, fieldsToUpdate);

      setTodos((currentTodos) => currentTodos.map(todo => (
        todo.id === updatedTodo.id
          ? updatedTodo
          : todo
      )));
    } catch (e) {
      window.alert(String(e));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} user={user} />
      <TodoList
        todos={todos}
        user={user}
        onTodoDelete={deleteTodo}
        onTodoUpdate={updateTodo}
      />
    </div>
  );
};
