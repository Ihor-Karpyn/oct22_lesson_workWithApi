import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => Promise<boolean>;
  onUpdate: (todo: Todo) => void;
  user: User | null;
  processDeletingTodoIds: number[]
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  onDelete,
  onUpdate,
  user,
  processDeletingTodoIds,
}) => {
  const [editing, setEditing] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDeleteTodo = async () => {
    setIsDeleteLoading(true);

    const isDeleted = await onDelete(todo.id);

    if (!isDeleted) {
      setIsError(true);
    }

    setIsDeleteLoading(false);
  };

  const onSubmitEditForm = useCallback(async (todoData) => {
    await onUpdate({ id: todo.id, ...todoData });

    setEditing(false);
  }, []);

  const isLoading = isDeleteLoading
    || todo.id === 0
    || processDeletingTodoIds.includes(todo.id);

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
          user={user}
          onSubmit={onSubmitEditForm}
        />
      ) : (
        <>
          {isError && <h1>Error</h1>}

          <h2 className="TodoInfo__title">
            {todo.title}
            {isLoading && (
              <span style={{ color: 'black', marginLeft: '10px' }}>
                Loading
              </span>
            )}
          </h2>

          {user && (
            <UserInfo user={user} />
          )}

          <button
            type="button"
            onClick={handleDeleteTodo}
            disabled={isLoading}
          >
            x
          </button>

          <button
            type="button"
            onClick={() => setEditing(true)}
            disabled={isLoading}
          >
            edit
          </button>
        </>
      )}
    </article>
  );
};
