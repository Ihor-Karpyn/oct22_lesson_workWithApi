import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => Promise<boolean>;
  onTodoUpdate: (todo: Todo) => void;
  user: User | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoDelete,
  onTodoUpdate,
  user,
}) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        todo={todo}
        user={user}
        onDelete={onTodoDelete}
        onUpdate={onTodoUpdate}
      />
    ))}
  </section>
);
