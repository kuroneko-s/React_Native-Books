import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

function CalendarView({markedDates, selectedDate, onSelectDate}) {
  const green = '#009688';
  /* const markedDates = {
    '2022-05-17': {
      selected: true,
    },
    '2022-05-07': {
      marked: true,
    },
    '2022-05-27': {
      marked: true,
    },
  }; */

  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };
  console.log(JSON.stringify(markedSelectedDate, null, 2));
  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      theme={{
        selectedDayBackgroundColor: green,
        arrowColor: green,
        dotColor: green,
        todayTextColor: green,
      }}
      onDayPress={day => onSelectDate(day.dateString)}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
