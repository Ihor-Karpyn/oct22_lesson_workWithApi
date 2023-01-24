import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => Promise<boolean>;
  onUpdate: (todo: Todo) => void;
  user: User | null;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  onDelete,
  onUpdate,
  user,
}) => {
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDeleteTodo = async () => {
    setIsLoading(true);

    const isDeleted = await onDelete(todo.id);

    if (!isDeleted) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      {editing ? (
        <TodoForm
          todo={todo}
          onSubmit={todoData => {
            onUpdate({ id: todo.id, ...todoData });
            setEditing(false);
          }}
        />
      ) : (
        <>
          {isLoading && <h1>Loading</h1>}
          {isError && <h1>Error</h1>}

          <h2 className="TodoInfo__title">{todo.title}</h2>

          {user && (
            <UserInfo user={user} />
          )}

          <button type="button" onClick={handleDeleteTodo}>
            x
          </button>

          <button type="button" onClick={() => setEditing(true)}>
            edit
          </button>
        </>
      )}
    </article>
  );
};
