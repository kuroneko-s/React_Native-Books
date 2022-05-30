import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FeedList from '../../conponents/FeedList';
import LogContext from '../../context/LogContext';
import SearchContext from '../../context/SearchContext';
import EmptySearchResult from './../../conponents/EmptySearchResult';

function SearchScreen() {
  const {keyword} = useContext(SearchContext);
  const {logs} = useContext(LogContext);

  if (keyword === '') return <EmptySearchResult type={'EMPTY_KEYWORD'} />;

  const filtered =
    keyword === ''
      ? []
      : logs.filter(log =>
          [log.title, log.body].some(text =>
            text.toLowerCase().includes(keyword.toLowerCase()),
          ),
        );

  if (filtered.length === 0) return <EmptySearchResult type={'NOT_FOUND'} />;

  return (
    <View style={styles.block}>
      <FeedList logs={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
});

export default SearchScreen;
