import React from 'react';
import ListItem from './ListItem';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';

const defaultProps = {
  name: "Shopping",
  desc: "Buy clothes"
};
const defaultState = {};

const setup = (props={}, state=null) => {
  const setupProps = {...defaultProps, ...props};
  const setupState = {...defaultState, ...state};
  const wrapper = shallow(<ListItem {...setupProps}/>);
  if (setupState) wrapper.setState(setupState);
  return wrapper;
};

test('Renders without error', () => {
  const wrapper = setup(),
    component = findByTestAttr(wrapper, 'component-todo');
  expect(component.length).toBe(1);
});

test('Renders correct info', () => {
  const item = {
    name: "Shopping",
    desc: "Buy clothes"
  },
    wrapper = setup(item),
    itemName = findByTestAttr(wrapper, 'item-name'),
    itemDesc = findByTestAttr(wrapper, 'item-desc');
  expect(itemName.text().includes(item.name) && itemDesc.text().includes(item.desc)).toBe(true)
});

test('Buttons are disabled if rec unarmed', () => {
  const item = {
      name: "Shopping",
      desc: "Buy clothes",
      recArmed: false
    },
    wrapper = setup(item),
    edit = findByTestAttr(wrapper, 'edit-btn'),
    remove = findByTestAttr(wrapper, 'remove-btn');

  expect(edit.prop('disabled') && remove.prop('disabled')).toBe(true);
});

test('Buttons are enabled if rec armed', () => {
  const item = {
      name: "Shopping",
      desc: "Buy clothes",
      recArmed: true
    },
    wrapper = setup(item),
    edit = findByTestAttr(wrapper, 'toggle-edit'),
    remove = findByTestAttr(wrapper, 'remove-btn');

  expect(!edit.prop('disabled') && !remove.prop('disabled')).toBe(true);
});

test('"Edit" input fields are hidden if "Record" not armed', () => {
  let hidden = true;
  const wrapper = setup(),
    editInput = findByTestAttr(wrapper, 'edit-input');
  for (let i=0; i<editInput.length; i++) {
    if (editInput.at(i).hasClass('hidden') === false) {
      hidden = false;
      break
    }
  }
  expect(hidden).toBe(true);
});

test('"Edit" input fields display when when "Edit" clicked', () => {
  let hidden = true;
  const wrapper = setup({recArmed: true}),
    toggleEdit = findByTestAttr(wrapper, 'toggle-edit');
  toggleEdit.simulate('click');
  const editInput = findByTestAttr(wrapper, 'edit-input');
  for (let i=0; i<editInput.length; i++) {
    if (editInput.at(i).hasClass('hidden') === false) {
      hidden = false;
      break
    }
  }
  expect(hidden).toBe(false);
});