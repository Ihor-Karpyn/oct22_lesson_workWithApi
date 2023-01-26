import React, { FC } from 'react';

interface Props {
  messages: string[];
  close: (m: string) => void;
}

export const ErrorMessage: FC<Props> = React.memo(({ messages, close }) => {
  return (
    <>
      {messages.map(message => (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => close(message)}
          />

          {message}
          <br />
        </div>
      ))}
    </>
  );
});
