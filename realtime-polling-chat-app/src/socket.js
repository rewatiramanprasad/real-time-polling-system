import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = io('https://real-time-polling-system.vercel.app/',{
    //   // transports: ['websocket', 'polling'],

    //   // withCredentials: true
    // }); //https://real-time-polling-system.vercel.app/
    const newSocket=io('https://polling-chat-backend.onrender.com',{
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection:true,
      reconnectionAttempts:5
    })

    console.log(newSocket)
    setSocket(newSocket);

    console.log("its me")

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
