import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import Header from './components/header/Header';
import App from './App';

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a Header component', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should render a Route component matching "/"', () => {
    expect(wrapper.find({ path : '/'}).type()).toBe(Route);
  });

  it('should render a Route component matching "/:mode(user|computer)"', () => {
    expect(wrapper.find({ path: '/:mode(user|computer)' }).type()).toBe(Route);
  });
});