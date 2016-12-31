import Radium from 'radium';
import React from 'react';
import _ from 'lodash';

export const WEEKDAY = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6
};

const WEEKDAY_LABELS = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN'
];

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  item: {
    flexGrow: 1,
    padding: 4,
    color: '#999',
    textAlign: 'center',
    fontSize: 20,
    cursor: 'pointer',
    ':hover': {
      color: '#bbb',
      backgroundColor: 'rgba(134, 195, 223, 0.7)'
    }
  },
  selectedItem: {
    backgroundColor: 'rgb(134, 195, 223)',
    color: '#eee',
    ':hover': {
      color: '#fff',
      backgroundColor: 'rgb(134, 195, 223)'
    }
  }
};

let WeekdayPicker = ({ time, onTimeChange }) => {
  const { weekday } = time;
  const onWeekdayClick = weekday => () => onTimeChange({
    ...time,
    weekday
  });
  return (
    <div style={ styles.row } >
    {
      _.map(WEEKDAY, wd => (
        <div
          style={ [styles.item, wd === weekday && styles.selectedItem] }
          key={ wd }
          onClick={ onWeekdayClick(wd) }>
          { WEEKDAY_LABELS[wd] }
        </div>
      ))
    }
    </div>
  );
};

WeekdayPicker.propTypes = {
  time: React.PropTypes.shape({
    weekday: React.PropTypes.number
  }),
  onTimeChange: React.PropTypes.func
};

WeekdayPicker.defaultProps = {
  time: {
    weekday: 0
  },
  onTimeChange: () => undefined,
};

WeekdayPicker = Radium(WeekdayPicker);

export default WeekdayPicker;
