import React, { useCallback, useEffect, useState } from 'react';
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
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { useErrorMessage } from './controllers/useErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempNewTodo, setTempNewTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showError, closeError, errorMassages] = useErrorMessage();
  const [processDeletingTodoIds, setProcessDeletingTodoIds] = useState<number[]>([]);

  useEffect(() => {
    const userId = 4181;

    getTodosByUserId(userId)
      .then((todosFromServer) => setTodos(todosFromServer));

    getUserById(userId)
      .then((userFromServer) => setUser(userFromServer));
  }, []);

  const addTodo = async (todoData: Omit<Todo, 'id'>) => {
    try {
      const tempTodo = {
        ...todoData,
        id: 0,
      };

      setTempNewTodo(tempTodo);

      const newTodo = await createTodo(todoData);

      setTodos(currentTodos => [...currentTodos, newTodo]);
      setTempNewTodo(null);
    } catch (e) {
      showError('Smth went wrong on add todo');
      setTempNewTodo(null);
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      setProcessDeletingTodoIds(prev => [...prev, todoId]);

      const responseResult = await deleteTodoById(todoId);

      setTodos(currentTodos => currentTodos.filter(
        todo => todo.id !== todoId,
      ));

      setProcessDeletingTodoIds(prev => prev.filter(id => id !== todoId));

      return responseResult;
    } catch (e) {
      setProcessDeletingTodoIds(prev => prev.filter(id => id !== todoId));
      showError('Error while deliting todo');

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
        tempNewTodo={tempNewTodo}
        user={user}
        onTodoDelete={deleteTodo}
        onTodoUpdate={updateTodo}
        processDeletingTodoIds={processDeletingTodoIds}
      />
      <ErrorMessage messages={errorMassages} close={closeError} />
    </div>
  );
};
