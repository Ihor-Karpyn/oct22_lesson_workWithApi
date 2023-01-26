import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => Promise<boolean>;
  onTodoUpdate: (todo: Todo) => void;
  user: User | null;
  tempNewTodo: Todo | null;
  processDeletingTodoIds: number[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoDelete,
  onTodoUpdate,
  user,
  tempNewTodo,
  processDeletingTodoIds,
}) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        todo={todo}
        user={user}
        onDelete={onTodoDelete}
        onUpdate={onTodoUpdate}
        processDeletingTodoIds={processDeletingTodoIds}
      />
    ))}

    {tempNewTodo && (
      <TodoInfo
        todo={tempNewTodo}
        onDelete={onTodoDelete}
        onUpdate={onTodoUpdate}
        user={user}
        processDeletingTodoIds={processDeletingTodoIds}
      />
    )}
  </section>
);
