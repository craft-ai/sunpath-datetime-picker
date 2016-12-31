import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, number } from '@kadira/storybook-addon-knobs';
import React from 'react';
import Sunpath from '../src/index.js';

let onTimeChangeAction = ({ weekday, hour, minute }) => action('onTimeChange')(weekday, hour, minute);

storiesOf('Sunpath', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Sunpath/>
  ))
  .add('at 3:01 on Sunday (controlled)', () => (
    <Sunpath
      time={{
        weekday: 6,
        hour: 3,
        minute: 1
      }}
      onTimeChange={onTimeChangeAction}
      style={{
        fontFamily: 'Roboto Mono, monospace',
        height: 400,
        width: 600
      }}/>
  ))
  .add('at 6:30 on Tuesday (controlled)', () => (
    <Sunpath
      time={{
        weekday: 1,
        hour: 6,
        minute: 30
      }}
      onTimeChange={onTimeChangeAction}
      style={{
        fontFamily: 'Roboto Mono, monospace',
        height: 400,
        width: 600
      }}/>
  ))
  .add('at 11:58 on Friday (controlled)', () => (
    <Sunpath
      time={{
        weekday: 4,
        hour: 11,
        minute: 58
      }}
      onTimeChange={onTimeChangeAction}
      style={{
        fontFamily: 'Roboto Mono, monospace',
        height: 400,
        width: 600
      }}/>
  ))
  .add('at 17:30 on Monday (controlled)', () => (
    <Sunpath
      time={{
        weekday: 0,
        hour: 17,
        minute: 30
      }}
      onTimeChange={onTimeChangeAction}
      style={{
        fontFamily: 'Roboto Mono, monospace',
        height: 400,
        width: 600
      }}/>
  ))
  .add('dynamic (controlled)', () => (
    <Sunpath
      time={{
        weekday: number('weekday', 3, {
          range: true,
          min: 0,
          max: 6,
          step: 1
        }),
        hour: number('hour', 16, {
          range: true,
          min: 0,
          max: 23,
          step: 1
        }),
        minute: number('minute', 32, {
          range: true,
          min: 0,
          max: 59,
          step: 1
        })
      }}
      onTimeChange={onTimeChangeAction}
      style={{
        fontFamily: 'Roboto Mono, monospace',
        height: 600,
        width: '100%'
      }} />
  ))
  .add('Uncontrolled', () => (
    <Sunpath
      defaultTime={{
        weekday: 3,
        hour: 3,
        minute: 1
      }}
      onTimeChange={onTimeChangeAction}
      style={{
        fontFamily: 'Roboto Mono, monospace',
        height: 400,
        width: '90%'
      }} />
  ))
