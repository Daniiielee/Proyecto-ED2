import React, { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import styles from './Chat.module.scss';

const Chat: React.FC = () => {
  const { currentUser } = useAuth();
  const { messages, newMessage, setNewMessage, sendMessage, loading } = useChat();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className={styles.chatPage}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Chat</h1>
        </div>
      </header>

      <section className={styles.chatContainer}>
        {loading ? (
          <div className={styles.statusMessage}>Cargando mensajes...</div>
        ) : messages.length === 0 ? (
          <div className={styles.statusMessage}>
            No hay mensajes aún. ¡Sé el primero en escribir!
          </div>
        ) : (
          <div className={styles.messagesWrapper}>
            {messages.map((message) => {
              const ownMessage = currentUser?.uid === message.userId;
              const timeLabel = new Date(message.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={message.id}
                  className={`${styles.messageItem} ${ownMessage ? styles.ownMessage : styles.otherMessage}`}
                >
                  <div className={styles.messageHeader}>
                    <span className={styles.userName}>{message.userName}</span>
                    <span className={styles.messageTime}>{timeLabel}</span>
                  </div>
                  <div className={styles.messageText}>{message.text}</div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
        )}
      </section>

      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit" className={styles.sendButton}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;
