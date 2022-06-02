import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import FloatingWirteButton from '../../components/FloatingWirteButton';
import FeedsListComponent from './../../components/FeedsListComponent';
import {feedsContext} from './../../context/FeedsContext';
import feedsStorage from './../../storage/FeedsStorage';

function FeedsTabScreen() {
  const {feeds, setFeeds} = useContext(feedsContext);

  return (
    <View style={styles.block}>
      <FeedsListComponent data={feeds} />
      <FloatingWirteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedsTabScreen;
