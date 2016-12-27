import Color from 'color';
import Radium from 'radium';
import React from 'react';
import { extractWeights } from './utils';

const styles = {
  global : {
    fontFamily: 'Roboto Mono, monospace'
  },
  digits : {
    fontSize: 90
  },
  ampm: {
    marginLeft: 10,
    fontSize: 20,
    textTransform: 'uppercase'
  }
};

const colors = {
  night: Color('rgb(143, 191, 232)'),
  day: Color('rgb(48, 48, 48)')
};

let padDigit = num => {
  const str = '' + num;
  const pad = '00';
  return pad.substring(0, pad.length - str.length) + str;
};

let Display = ({ time, h24 }) => {
  const { hour, minute } = time;
  const pm = hour >= 12;
  const displayedHour =
    hour == 0 ?
      12
    : hour <= 12 ?
      hour
    :
      hour - 12;

  const { day } = extractWeights(time);
  return (
    <div style={{
      ...styles.global,
      color: colors.night
        .mix(colors.day, 1 - day)
    }} >
      <span style={styles.digits}>
        { padDigit(displayedHour) }:{ padDigit(minute) }
      </span>
      {
        !h24 ? (
          <span style={styles.ampm}>
            { pm ? 'pm' : 'am' }
          </span>
        ) : (
          void 0
        )
      }
    </div>
  );
};

Display.propTypes = {
  time: React.PropTypes.shape({
    hour: React.PropTypes.number,
    minute: React.PropTypes.number
  }),
  h24: React.PropTypes.bool
};

Display.defaultProps = {
  time: {
    hour: 0,
    minute: 0
  },
  h24: false
};

Display = Radium(Display);

export default Display;
