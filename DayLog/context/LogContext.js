import React, {createContext, useEffect, useRef, useState} from 'react';
import {v4} from 'uuid';
import logsStorage from './../store/LogsStorage';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const initLogsRef = useRef(null); // asyncStorage랑 logs state 랑 값 비교하기 위해서 ref 사용중
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

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
