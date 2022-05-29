import React, {createContext, useState} from 'react';
import {v4} from 'uuid';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const [logs, setLogs] = useState(
    Array.from({length: 12}).map((_, index) => ({
      id: v4(),
      title: `Log ${index}`,
      body: `Log ${index}`,
      date: new Date().toISOString(),
    })),
  );

  const onCreate = ({title, body, date}) => {
    const log = {
      id: v4(),
      title,
      body,
      date,
    };

    setLogs([log, ...logs]);
  };

  const onModify = modified => {
    const newLogs = logs.map(log => (log.id === modified.id ? modified : log));

    setLogs(newLogs);
  };

  const onRemove = id => {
    const newLogs = logs.filter(log => log.id !== id);

    setLogs(newLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
