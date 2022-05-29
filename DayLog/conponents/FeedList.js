import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedListItem from './FeedListItem';

function FeedList({logs, onScrolledToBottom}) {
  const onScroll = e => {
    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent; // Event Contents의 total height, 현재 보이는 height, 1번과 2번의 차이
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y; // 이 값이 0에 수렴할 수록 Bottom이다.

    if (
      contentSize.height > layoutMeasurement.height && // 화면에 보여지는 높이보다 컨텐츠의 갯수가 부족하면 Error 발생해서 이렇게 조건을 넘겨줘야함
      distanceFromBottom < 72
    ) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      /* onEndReached={props => {
        console.log('바닥에 닿음 - ', props);
      }}
      onEndReachedThreshold={0.85} // 85% 스크롤했을때 onEndReached가 호출 ( 무한 스크롤_트위터같은거 유용함 ) */
      onScroll={onScroll}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
