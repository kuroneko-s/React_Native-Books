import React, {useContext} from 'react';
import {View} from 'react-native';
import {searchContext} from './../../context/SearchContext';
import {feedsContext} from './../../context/FeedsContext';
import SearchEmptyComponent from './../../components/SearchEmptyComponent';
import FeedsListComponent from './../../components/FeedsListComponent';

function SearchTabScreen() {
  const {search, setSearch} = useContext(searchContext);
  const {feeds, setFeeds} = useContext(feedsContext);

  console.log(search);

  if (search === '') return <SearchEmptyComponent type={'EMPTY'} />;

  const filtered =
    search === ''
      ? []
      : feeds.filter(feed =>
          [feed.title, feed.body].some(text =>
            text.toLowerCase().includes(search.toLowerCase()),
          ),
        );

  if (filtered.length === 0) return <SearchEmptyComponent type={'NOT_FOUND'} />;

  return (
    <View style={{flex: 1}}>
      <FeedsListComponent data={filtered} />
    </View>
  );
}

export default SearchTabScreen;
