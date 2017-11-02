import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import config from '../../config';
import { GAME_STATUS_TIE } from '../../constants/gameStatus.constants';
import Shape from './Shape';

const { ROCK_SHAPE } = config;

describe('Shape component', () => {
  it('should render a div with the .shape css class', () => {
    const wrapper = shallow(<Shape shape={ROCK_SHAPE} />);

    expect(wrapper.find('.shape')).toHaveLength(1);
  });

  describe('shape type', () => {
    it('should compose css class from the shape prop', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} />);

      expect(component.find('.fa-hand-rock-o')).toHaveLength(1);
    });
  });

  describe('selected prop', () => {
    it('should not have shape.selected css by default', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} />);

      expect(component.find('.selected')).toHaveLength(0);
    });

    it('should have shape.selected css when true', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} selected />);

      expect(component.find('.selected')).toHaveLength(1);
    });
  });

  describe('canBePlayed prop', () => {
    it('should not have shape.canBePlayed css by default', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} />);

      expect(component.find('.canBePlayed')).toHaveLength(0);
    });

    it('should have shape.canBePlayed css when true', () => {
      const component = shallow(<Shape canBePlayed shape={ROCK_SHAPE} selected />);

      expect(component.find('.canBePlayed')).toHaveLength(1);
    });
  });

  describe('onClick', () => {
    it('should call the onClick prop when clicking on the component', () => {
      const onClickStub = sinon.stub();
      const wrapper = shallow(<Shape shape={ROCK_SHAPE} onClick={onClickStub} />);

      wrapper.simulate('click');

      expect(onClickStub.calledOnce).toBe(true);
    });
  });

  describe('Default state', () => {
    it('should not have the .winning or .loosing or .selected class', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} gameStatus="" />);

      expect(component.find('.winning')).toHaveLength(0);
      expect(component.find('.loosing')).toHaveLength(0);
      expect(component.find('.selected')).toHaveLength(0);
    });
  });

  describe('Winning state', () => {
    it('should have the .winning class', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} selected winning gameStatus="" />);

      expect(component.find('.winning')).toHaveLength(1);
    });
  });

  describe('Loosing state', () => {
    it('should have the .loosing class', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} selected gameStatus="" />);

      expect(component.find('.loosing')).toHaveLength(1);
    });
  });

  describe('Tie state', () => {
    it('should not have the .loosing or .winning class', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} selected gameStatus={GAME_STATUS_TIE} />);

      expect(component.find('.loosing')).toHaveLength(0);
      expect(component.find('.winning')).toHaveLength(0);
    });
  });
});