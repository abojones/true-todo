import React from 'react';
import List from './List';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';

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

test('List renders empty when list is empty', () => {
  const wrapper = setup();
  const items = findByTestAttr(wrapper, 'todo-item');
  expect(items.length).toBe(0);
});

test('List renders with correct number of items', () => {
  const activeList = [
    {
      name: "Washing",
      description: "Wash clothes"
    },
    {
      name: "Shopping",
      description: "Buy toothpaste"
    }
  ];
  const wrapper = setup({ activeList });
  const items = findByTestAttr(wrapper, 'todo-item');
  expect(items.length).toBe(activeList.length);
});

