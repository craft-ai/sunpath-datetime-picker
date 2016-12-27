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
      time: {
        hour: 0,
        minute: 0
      },
      onTimeChange: () => undefined,
      style: {}
    };
  },
  getInitialState: function() {
    const { defaultTime } = this.props;
    if (defaultTime) {
      return {
        time: { ...defaultTime }
      };
    }
    else {
      return {};
    }
  },
  componentWillMount: function() {
    this.onTimeChange = (time) => {
      this.props.onTimeChange(time);
      if (this.props.defaultTime) {
        this.setState({
          time: { ...time }
        });
      }
    };
  },
  render: function() {
    const { style, defaultTime } = this.props;
    const time = defaultTime ? this.state.time : this.props.time;
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
