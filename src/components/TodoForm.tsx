import { useState } from 'react';
import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

type Props = {
  todo?: Todo;
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  user: User | null
};

export const TodoForm: React.FC<Props> = ({ onSubmit, todo, user }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [userId, setUserId] = useState(0);
  const [completed, setCompleted] = useState(todo?.completed || false);

  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      title, userId, completed,
    });

    setCompleted(false);
    setTitle('');
    setUserId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>
          {'Title: '}
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
        </label>

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          {'User: '}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value={0} disabled>chose user</option>
            <option value={user?.id}>{user?.name}</option>
          </select>
        </label>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <div className="field">
        <label>
          Done:
          <input
            type="checkbox"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
        </label>
      </div>

      <button type="submit" data-cy="submitButton">
        Save
      </button>
    </form>
  );
};
