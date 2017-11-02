import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { noop } from 'lodash';

import config from '../../config';
import Shape from '../shape/Shape';
import GameStatus from '../game-status/GameStatus';
import Game from './Game';

const { ROCK_SHAPE, PAPER_SHAPE } = config;

describe('Game component', () => {
  const shapes = [ROCK_SHAPE, PAPER_SHAPE];
  const players = {
    player1 : { selectedShape: null, canPlay: true },
    player2 : { selectedShape: null },
  }

  it('should call the init prop on componentDidMount', () => {
    const initStub = sinon.stub();
    shallow(<Game init={initStub} play={noop} autoPlay={noop} shapes={[]} />);

    expect(initStub.calledOnce).toBe(true);
  });

  describe('shapes rendering', () => {
    it('should render 2 sets of available shapes', () => {
      const wrapper = shallow(<Game init={noop} play={noop} autoPlay={noop} shapes={shapes} />);

      expect(wrapper.find(Shape)).toHaveLength(shapes.length*2);
    });
  });

  describe('Game status', () => {
    it('should have a GameStatus component', () => {
      const wrapper = shallow(<Game init={noop} play={noop} autoPlay={noop} shapes={shapes} />);

      expect(wrapper.find(GameStatus)).toHaveLength(1);
    });
  });

  describe('Play', () => {
    describe('Click on a shape', () => {
      it('should call the play action with the right payload', () => {
        const playActionStub = sinon.stub();
        const wrapper = shallow(<Game init={noop} play={playActionStub} autoPlay={noop} shapes={shapes} players={players} />);

        const firstShape = wrapper.find(Shape).first();
        firstShape.simulate('click');

        expect(playActionStub.calledOnce).toBe(true);
        expect(playActionStub.calledWith('player1', firstShape.prop('shape'))).toBe(true);
      });
    });
  });

  describe('AutoPlay', () => {
    describe('Click on play button', () => {
      it('should call the autoPlay action', () => {
        const autoPlayActionStub = sinon.stub();
        const wrapper = shallow(<Game init={noop} play={noop} autoPlay={autoPlayActionStub} shapes={shapes} players={players} showPlay />);

        const button = wrapper.find('#autoPlayButton');
        button.simulate('click');

        expect(autoPlayActionStub.calledOnce).toBe(true);
      });
    });
  });
});