import React from 'react';
import { shallow } from 'enzyme';

import store from '../reducers/configureStore';
import GameContainer from './Game.container';

describe('Game container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GameContainer store={store} />);
  });

  describe('mapStateToPros', () => {
    it('should have a shapes prop', () => {
      expect(wrapper.prop('shapes')).toBeDefined();
    });

    it('should have a status prop', () => {
      expect(wrapper.prop('status')).toBeDefined();
    });

    it('should have a players prop', () => {
      expect(wrapper.prop('players')).toBeDefined();
    });

    it('should have a winner prop', () => {
      expect(wrapper.prop('winner')).toBeDefined();
    });

    it('should have a showReset prop', () => {
      expect(wrapper.prop('showReset')).toBeDefined();
    });

    it('should have a showPlay prop', () => {
      expect(wrapper.prop('showPlay')).toBeDefined();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should have a init prop', () => {
      expect(wrapper.prop('init')).toBeDefined();
    });

    it('should have a play prop', () => {
      expect(wrapper.prop('play')).toBeDefined();
    });

    it('should have a autoPlay prop', () => {
      expect(wrapper.prop('autoPlay')).toBeDefined();
    });
  });
});