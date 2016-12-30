import Radium from 'radium';
import RcSlider from 'rc-slider';
import React from 'react';
import { addTime } from './utils';

import 'rc-slider/assets/index.css';



const sliderConf = {
  min: 0,
  max: 2399,
  marks: {
    600: 'dawn',
    1200: 'noon',
    1800: 'dusk'
  }
};

const styles = {
  global: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 10,
    textTransform: 'uppercase'
  },
  buttons: {
    flexGrow: 0,
    height: 24,
    width: 24,
    border: 'none',
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 2,
    paddingRight: 0,
    paddingLeft: 0,
    lineHeight: '16px',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgb(134, 195, 223)',
    color: 'rgb(233, 233, 233)',
    ':hover': {
      backgroundColor: 'rgba(134, 195, 223, 0.5)'
    },
    ':focus': {
      border: 'none',
      outline: 'none'
    },
    ':active': {
      border: 'none',
      outline: 'none'
    }
  },
  slider: {
    flexGrow: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10
  }
};

export function sliderValueFromTime({ hour, minute }) {
  return hour * 100 + Math.floor(minute / 60 * 100);
}

export function timeFromSliderValue(v) {
  return {
    hour: Math.floor(v / 100),
    minute: Math.floor((v % 100) / 100 * 60)
  };
}

let Slider = React.createClass({
  propTypes: {
    time: React.PropTypes.shape({
      hour: React.PropTypes.number,
      minute: React.PropTypes.number
    }),
    onTimeChange: React.PropTypes.func,
    speed: React.PropTypes.number // Seconds per actual seconds
  },
  getDefaultProps: function() {
    return {
      time: {
        hour: 0,
        minute: 0
      },
      onTimeChange: () => undefined,
      speed: 120
    };
  },
  addToTime: function(addedTime) {
    const { time, onTimeChange } = this.props;
    onTimeChange(addTime(time, addedTime));
  },
  setRepeater: function(f, interval) {
    this.clearRepeater();
    this.repeater = setInterval(f, interval);
  },
  clearRepeater: function() {
    if (this.repeater) {
      clearInterval(this.repeater);
      this.repeater = undefined;
    }
  },
  componentWillMount: function() {
    this.onPlusClick = e => {
      this.addToTime({
        hour: 0,
        minute: 1
      });
      e.stopPropagation();
    };
    this.onMinusClick = e => {
      this.addToTime({
        hour: 0,
        minute: -1
      });
      e.stopPropagation();
    };
    this.onPlusMouseDown = e => {
      const { speed } = this.props;
      this.setRepeater(() => this.addToTime({
        hour: 0,
        minute: 10
      }), 10000 / speed);
      e.stopPropagation();
    };
    this.onMinusMouseDown = e => {
      const { speed } = this.props;
      this.setRepeater(() => this.addToTime({
        hour: 0,
        minute: -10
      }), 10000 / speed);
      e.stopPropagation();
    };
    this.onPlusMouseUp = this.clearRepeater;
    this.onMinusMouseUp = this.clearRepeater;
    this.onSliderChange = v => {
      const { time, onTimeChange } = this.props;
      onTimeChange({
        ...time,
        ...timeFromSliderValue(v)
      });
    };
  },
  componentWillUnmount: function() {
    this.clearRepeater();
  },
  render: function() {
    const { time } = this.props;
    return (
      <div style={ styles.global }>
        <button
          key='minus'
          style={ styles.buttons }
          onClick={ this.onMinusClick }
          onMouseDown={ this.onMinusMouseDown }
          onMouseUp={ this.onMinusMouseUp } >
          &lt;
        </button>
        <div style={ styles.slider } >
          <RcSlider
            min={ sliderConf.min }
            max={ sliderConf.max }
            marks={ sliderConf.marks }
            value={ sliderValueFromTime(time) }
            onChange={ this.onSliderChange }
            tipFormatter={ null }/>
        </div>
        <button
          key='plus'
          style={ styles.buttons }
          onClick={ this.onPlusClick }
          onMouseDown={ this.onPlusMouseDown }
          onMouseUp={ this.onPlusMouseUp } >
          &gt;
        </button>
      </div>
    );
  }
});

Slider = Radium(Slider);

export default Slider;
