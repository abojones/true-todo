import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

test('renders without error', () => {
  const wrapper = shallow(<App/>);
  const component = wrapper.find('[data-test="component-app"]');
  expect(component.length).toBe(1);
});