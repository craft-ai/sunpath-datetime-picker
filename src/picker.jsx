import _ from 'lodash';
import Display from './display';
import React from 'react';
import Sky from './sky';
import Slider from './slider';

let Picker = React.createClass({
  propTypes: {
    defaultTime: React.PropTypes.shape({
      hour: React.PropTypes.number,
      minute: React.PropTypes.number
    }),
    time: React.PropTypes.shape({
      hour: React.PropTypes.number,
      minute: React.PropTypes.number
    }),
    onTimeChange: React.PropTypes.func,
    style: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      defaultTime: {
        hour: 0,
        minute: 0
      },
      onTimeChange: () => undefined,
      style: {}
    };
  },
  getInitialState: function() {
    const { time, defaultTime } = this.props;
    if (_.isUndefined(time)) {
      return {
        controlled: false,
        time: { ...defaultTime }
      };
    }
    else {
      return {
        controlled: true
      };
    }
  },
  componentWillMount: function() {
    this.onTimeChange = (time) => {
      const { onTimeChange } = this.props;
      const { controlled } = this.state;
      onTimeChange(time);
      if (!controlled) {
        this.setState({
          time: { ...time }
        });
      }
    };
  },
  render: function() {
    const { style } = this.props;
    const { controlled } = this.state;
    const time = controlled ? this.props.time : this.state.time;
    return (
      <div
        className='btp'
        style={{
          height: 200,
          width: 400,
          ...style,
          position: 'relative',
          minHeight: 200,
          minWidth: 400
        }}>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 0
        }}>
          <Sky time={ time } horizon={ 1 }/>
        </div>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <Display time={ time } />
          <div style={{
            alignSelf: 'stretch'
          }}>
            <Slider time={ time } onTimeChange={ this.onTimeChange } />
          </div>
        </div>
      </div>
    );
  }
});

export default Picker;
