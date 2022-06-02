import React, {useState, useMemo, useContext} from 'react';
import {Calendar} from 'react-native-calendars';
import {format} from 'date-fns';
import FeedsListComponent from '../../components/FeedsListComponent';
import {feedsContext} from '../../context/FeedsContext';

function CalendarTabScreen() {
  const {feeds: logs} = useContext(feedsContext);
  const [select, setSelect] = useState(format(new Date(), 'yyyy-MM-dd'));

  const markedDates = useMemo(() => {
    return logs
      .map(log => format(new Date(log.date), 'yyyy-MM-dd'))
      .reduce((prev, next) => {
        prev[next] = {marked: true};
        return prev;
      }, {});
  }, [logs]);

  const newObj = {
    ...markedDates,
    [select]: {
      selected: true,
      marked: markedDates?.marked,
    },
  };

  const selectLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === select,
  );

  return (
    <FeedsListComponent
      data={selectLogs}
      ListHeaderComponent={
        <Calendar
          markedDates={newObj}
          onDayPress={({dateString}) => setSelect(dateString)}
        />
      }
    />
  );
}

export default CalendarTabScreen;
