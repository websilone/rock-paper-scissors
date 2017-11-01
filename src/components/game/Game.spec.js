import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import config from '../../config';
import Shape from '../shape/Shape';
import GameStatus from '../game-status/GameStatus';
import Game from './Game';

const { ROCK_SHAPE, PAPER_SHAPE } = config;

describe('Game component', () => {
  const shapes = [ROCK_SHAPE, PAPER_SHAPE];

  it('should call the init prop on componentDidMount', () => {
    const initStub = sinon.stub();
    shallow(<Game init={initStub} shapes={[]} />);

    expect(initStub.calledOnce).toBe(true);
  });

  describe('shapes rendering', () => {
    it('should render 2 sets of available shapes', () => {
      const wrapper = shallow(<Game init={() => {}} shapes={shapes} />);

      expect(wrapper.find(Shape)).toHaveLength(shapes.length*2);
    });
  });

  describe('Game status', () => {
    it('should have a GameStatus component', () => {
      const wrapper = shallow(<Game init={() => {}} shapes={shapes} />);

      expect(wrapper.find(GameStatus)).toHaveLength(1);
    });
  });
});