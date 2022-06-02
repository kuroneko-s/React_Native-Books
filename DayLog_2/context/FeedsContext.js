import React, {createContext, useState, useEffect} from 'react';
import feedsStorage from '../storage/FeedsStorage';

export const feedsContext = createContext();

function FeedsContextProvider({children}) {
  const [feeds, setFeeds] = useState();

  useEffect(() => {
    const load = feedsStorage.get();
    setFeeds(load);
  }, []);

  useEffect(() => {
    feedsStorage.set(feeds);
  }, [feeds]);

  const onCreate = feed => {
    setFeeds([feed, ...feeds]);
  };

  const onModify = ({title, body, id}) => {
    setFeeds(
      feeds.map(feed => (feed.id === id ? {...feed, title, body} : feed)),
    );
  };

  return (
    <feedsContext.Provider value={{feeds, setFeeds, onCreate, onModify}}>
      {children}
    </feedsContext.Provider>
  );
}

export default FeedsContextProvider;
