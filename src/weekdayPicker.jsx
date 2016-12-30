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

let WeekdayPicker = ({ time, onTimeChange }) => {
  const { weekday } = time;
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    }} >
    {
      _.map(WEEKDAY, wd => (
        <div
          style={{
            fontWeight: weekday === wd ? 'bold' : 'normal'
          }}
          key={ wd } >  
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
