import { configure } from '@kadira/storybook';

function loadStories() {
  require('./sunpath.js');
}

configure(loadStories, module);
