import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';
const ENDPOINTS = {
  todosByUserId: '/todos?userId=',
  userById: '/users/',
  deleteTodoById: '/todos/',
  updateTodoById: '/todos/',
  createTodo: '/todos',
};

const get = <T>(endpoint: string): Promise<T> => {
  const requestUrl = `${BASE_URL}${endpoint}`;

  return fetch(requestUrl)
    .then(response => response.json());
};

const deleteMethod = <T>(endpoint: string): Promise<T> => {
  const requestUrl = `${BASE_URL}${endpoint}`;

  const requestInit: RequestInit = {
    method: 'DELETE',
  };

  return fetch(requestUrl, requestInit)
    .then(response => response.json());
};

const post = <T>(endpoint: string, body: string): Promise<T> => {
  const requestUrl = `${BASE_URL}${endpoint}`;

  const requestInit: RequestInit = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(requestUrl, requestInit)
    .then(response => response.json());
};

const patch = <T>(endpoint: string, body: string): Promise<T> => {
  const requestUrl = `${BASE_URL}${endpoint}`;

  const requestInit: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  return fetch(requestUrl, requestInit)
    .then(response => response.json());
};

export const updateTodo = (id: number, fieldsToUpdate: Partial<Todo>) => {
  const body = JSON.stringify(fieldsToUpdate);
  const requestEndpoint = `${ENDPOINTS.updateTodoById}${id}`;

  return patch<Todo>(requestEndpoint, body);
};

export const getTodosByUserId = (userId: number): Promise<Todo[]> => {
  const requestUrl = `${ENDPOINTS.todosByUserId}${userId}`;

  return get<Todo[]>(requestUrl);
};

export const getUserById = (userId: number): Promise<User> => {
  const requestUrl = `${ENDPOINTS.userById}${userId}`;

  return get<User>(requestUrl);
};

export const deleteTodoById = (todoId: number) => {
  const requestUrl = `${ENDPOINTS.deleteTodoById}${todoId}`;

  return deleteMethod<boolean>(requestUrl)
    .then(response => Boolean(response));
};

export const createTodo = (fieldsToCreate: Omit<Todo, 'id'>) => {
  const body = JSON.stringify(fieldsToCreate);

  return post<Todo>(ENDPOINTS.createTodo, body);
};
