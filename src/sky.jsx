import { extractWeights } from './utils';
import Measure from 'react-measure';
import Radium from 'radium';
import React from 'react';

let Sun = Radium(({ x, y, left, top, width, height, day }) => (
  <div>
    {/* The 'normal' sun */}
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      zIndex: 10,
      opacity: Math.min(day, 0.5),
      backgroundImage: `-webkit-radial-gradient(
        ${x}px ${y}px,
        circle,
        rgba(242,248,247,1) 0%,
        rgba(249,249,28,1) 3%,
        rgba(247,214,46,1) 8%,
        rgba(248,200,95,1) 12%,
        rgba(201,165,132,1) 30%,
        rgba(115,130,133,1) 51%,
        rgba(46,97,122,1) 85%,
        rgba(24,75,106,1) 100%)`
    }} />
    {/* The sun during the day */}
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      zIndex: 20,
      opacity: day * 0.7,
      backgroundImage: `-webkit-radial-gradient(
        ${x}px ${y}px,
        circle,
        rgba(252,255,251,0.9) 0%,
        rgba(253,250,219,0.4) 30%,
        rgba(226,219,197,0.01) 70%,
        rgba(226,219,197,0.0) 70%,
        rgba(201,165,132,0) 100%)`
    }} />
    {/* The sun during sunset and sunrise*/}
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      zIndex: 20,
      opacity: (1 - day) * 0.7,
      backgroundImage: `-webkit-radial-gradient(
        ${x}px ${y}px,
        circle,
        rgba(254,255,255,0.8) 5%,
        rgba(236,255,0,1) 10%,
        rgba(253,50,41,1) 25%,
        rgba(243,0,0,1) 40%,
        rgba(93,0,0,1) 100%)`
    }} />
  </div>
));


let SkyBg = Radium(({ left, top, width, height, day }) => (
  <div>
    {/* Day sky background */}
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      zIndex: 5,
      opacity: 0.52,
      backgroundImage: `-webkit-linear-gradient(
        bottom,
        rgba(249,251,240,1) 10%,
        rgba(215,253,254,1) 20%,
        rgba(167,222,253,1) 40%,
        rgba(110,175,255,1) 100%)`
    }} />
    {/* Night sky background */}
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      zIndex: 25,
      opacity: day > 0.5 ? 0 : 1 - day * 2,
      backgroundColor: '#000'
    }} />
  </div>
));

let Horizon = Radium(({ left, top, width, height, day }) => (
  <div>
    {/* Day horizon */}
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      zIndex: 5,
      opacity: 0.52,
      backgroundImage: `-webkit-linear-gradient(
        bottom,
        rgba(212,87,43,0.9) 0%,
        rgba(246,149,52,0.8) 20%,
        rgba(24,75,106,0) 100%)`
    }} />
    {/* Night horizon */}
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      width: width,
      height: height,
      zIndex: 30,
      opacity: day > 0.5 ? 0 : 0.5 - day,
      backgroundImage: `-webkit-linear-gradient(
        bottom,
        rgba(57,167,255,1) 0%,
        rgba(13,98,245,1) 20%,
        rgba(0,11,22,0.1) 60%)`
    }} />
  </div>
));

let computeParameters = (
  {
    time,
    width, // width in pixels
    height, // height in pixels
    horizon // 0 is horizon at the bottom, 1 is horizon at the top
  }) => {
  const { t, day } = extractWeights(time);
  return {
    sunX: t * width,
    sunY: (1 - day) * height + (horizon - 0.5) * height,
    skyTop: 0,
    skyLeft: 0,
    skyHeight: height * horizon,
    skyWidth: width,
    earthTop: height * horizon,
    earthLeft: 0,
    earthHeight: height * (1 - horizon),
    earthWidth: width,
    day: day
  };
};

let Sky = React.createClass({
  propTypes: {
    time: React.PropTypes.shape({
      hour: React.PropTypes.number,
      minute: React.PropTypes.number
    }),
    horizon: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      time: {
        hour: 0,
        minute: 0
      },
      horizon: 0.5
    };
  },
  getInitialState: function() {
    return {
      width: -1,
      height: -1
    };
  },
  componentWillMount: function() {
    this.setDimensions = ({ width, height }) => {
      this.setState({
        width,
        height
      });
    };
  },
  render: function() {
    const {
      sunX,
      sunY,
      skyTop,
      skyLeft,
      skyHeight,
      skyWidth,
      day
    } = computeParameters({
      ...this.props,
      ...this.state
    });

    return (
      <Measure onMeasure={this.setDimensions} >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          <Sun
            x={ sunX }
            y={ sunY }
            left={ skyLeft }
            top={ skyTop }
            width={ skyWidth }
            height={ skyHeight }
            day={ day } />
          <SkyBg
            left={ skyLeft }
            top={ skyTop }
            width={ skyWidth }
            height={ skyHeight }
            day={ day } />
          <Horizon
            left={ skyLeft }
            top={ skyTop }
            width={ skyWidth }
            height={ skyHeight }
            day={ day } />
        </div>
      </Measure>
    );
  }
});

export default Sky;
