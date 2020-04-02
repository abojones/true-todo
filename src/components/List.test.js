import React from 'react';
import List from './List';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../test/testUtils';

const defaultProps = {};

const setup = (props={}) => {
  const setupProps = {...defaultProps, ...props};
  return shallow(<List {...setupProps}/>)
};

test('Renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-list');
  expect(component.length).toBe(1);
});