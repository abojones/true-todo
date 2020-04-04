import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import {findByTestAttr} from "../../test/testUtils";

const setup = (state=null) => {
  let wrapper = shallow(<App/>);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = shallow(<App/>);
  const component = wrapper.find('[data-test="component-app"]');
  expect(component.length).toBe(1);
});

describe('Component not Recording', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({recArmed: false})
  });
  test('Inputs are disabled', () => {
    const nameInput = findByTestAttr(wrapper, 'name-input'),
      descInput = findByTestAttr(wrapper, 'desc-input');
    expect(nameInput.prop('disabled') && descInput.prop('disabled')).toBe(true);
  });
  test('Start recording button is enabled', () => {
    const recordBtn = findByTestAttr(wrapper, 'rec-ctrl');
    expect(recordBtn.text().toLowerCase()).toContain("start")
  });
  test('"Clear" button clears what has been recorded', () => {
    const state = {
      activeList: [{
        name: "Driving",
        desc: "Driving lessons"
      }],
      pendingList: [{
        name: "Skating",
        desc: "Roller rink"
      }],
      recArmed: false,
      rank: 0
    };
    wrapper = setup(state);
    const clearBtn = findByTestAttr(wrapper, 'clear-btn');
    clearBtn.simulate('click');
    expect(wrapper.state().activeList.length + wrapper.state().pendingList.length).toBe(0)
  })
});

describe('Component is recording', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({recArmed: true})
  });
  test('Inputs are enabled', () => {
    const nameInput = findByTestAttr(wrapper, 'name-input'),
      descInput = findByTestAttr(wrapper, 'desc-input');
    expect(nameInput.prop('disabled') && descInput.prop('disabled')).toBe(false);
  });
  test('Stop recording Button is enabled', () => {
    const recordBtn = findByTestAttr(wrapper, 'rec-ctrl');
    expect(recordBtn.text().toLowerCase()).toContain("stop")
  });
  test('Play button disabled', () => {
    const playBtn = findByTestAttr(wrapper, 'play-btn');
    expect(playBtn.prop('disabled')).toBe(true)
  })
});