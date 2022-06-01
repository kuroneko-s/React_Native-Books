import React, {useState, useMemo} from 'react';
import {Calendar} from 'react-native-calendars';
import {format} from 'date-fns';
import FeedsListComponent from './../../components/FeedsListComponent';

function CalendarTabScreen() {
  console.log('render!');
  const [logs, setLogs] = useState([
    {
      id: 1,
      title: 'title',
      body: 'body',
      date: new Date().getTime(),
    },
    {
      id: 1,
      title: 'title',
      body: 'body',
      date: new Date().getTime() - 1000 * 60 * 60 * 24 * 3,
    },
    {
      id: 1,
      title: 'title',
      body: 'body',
      date: new Date().getTime() - 1000 * 60 * 60 * 24 * 8,
    },
  ]);

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

  console.log(selectLogs);

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
