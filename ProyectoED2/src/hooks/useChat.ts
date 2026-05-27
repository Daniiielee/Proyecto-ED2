import { useEffect, useRef, useState } from 'react';
import { ref, push, onValue, off, type DataSnapshot } from 'firebase/database';
import { realtimeDb } from '../firebase/firebase';
import { Queue } from '../dataStructures/Queue';
import { useAuth } from './useAuth';
import type { ChatMessage } from '../types';

const CHAT_MESSAGES_PATH = 'chat/messages';

const useChat = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messageQueueRef = useRef(new Queue<ChatMessage>());

  useEffect(() => {
    const messagesRef = ref(realtimeDb, CHAT_MESSAGES_PATH);

    const handleValue = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      messageQueueRef.current.clear();

      if (data) {
        const loadedMessages = Object.values(data) as ChatMessage[];

        loadedMessages
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .forEach((message) => {
            messageQueueRef.current.enqueue(message);
          });
      }

      setMessages(messageQueueRef.current.toArray());
      setLoading(false);
    };

    onValue(messagesRef, handleValue, (error) => {
      console.error('Error cargando mensajes en tiempo real', error);
      setLoading(false);
    });

    return () => {
      off(messagesRef, 'value', handleValue);
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.uid,
      userName: currentUser.displayName || currentUser.email || 'Usuario',
      text: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await push(ref(realtimeDb, CHAT_MESSAGES_PATH), message);
      setNewMessage('');
    } catch (error) {
      console.error('Error enviando mensaje', error);
    }
  };

  return { messages, newMessage, setNewMessage, sendMessage, loading };
};

export default useChat;
