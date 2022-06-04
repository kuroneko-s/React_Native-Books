import React, {createContext, useState, useEffect, useRef} from 'react';
import feedsStorage from '../storage/FeedsStorage';

export const feedsContext = createContext();

function FeedsContextProvider({children}) {
  const initFeedsRef = useRef(null);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    (async () => {
      const load = await feedsStorage.get();
      if (load) {
        initFeedsRef.current = load;
        setFeeds(load);
      }
    })();
  }, []);

  useEffect(() => {
    if (feeds === initFeedsRef.current) {
      return;
    }
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
