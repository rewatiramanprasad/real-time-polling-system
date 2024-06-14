// import io from "socket.io-client";

// const socket = io.connect("http://localhost:3001");

// socket.on("connect", () => {
//     // setSocketId(socket.id);
//     console.log(socket.id);
//   });

//   export default socket;

import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
    console.log(newSocket)

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
