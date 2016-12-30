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
        height: 400,
        width: 600
      }}/>
  ))
  .add('at 3:01 on Thursday (uncontrolled)', () => (
    <Sunpath
      defaultTime={{
        weekday: 3,
        hour: 3,
        minute: 1
      }}
      onTimeChange={onTimeChangeAction}
      style={{
        height: 300,
        width: '80%'
      }} />
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
        height: 600,
        width: '100%'
      }} />
  ));
