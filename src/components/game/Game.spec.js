import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { noop } from 'lodash';

import config from '../../config';
import Player from '../player/Player';
import GameStatus from '../game-status/GameStatus';
import Game from './Game';

const { ROCK_SHAPE, PAPER_SHAPE } = config;

describe('Game component', () => {
  const shapes = [ROCK_SHAPE, PAPER_SHAPE];
  const players = {
    player1 : { selectedShape: null, canPlay: true, icon: 'user' },
    player2 : { selectedShape: null, icon: 'desktop' },
  }

  it('should call the init prop on componentDidMount', () => {
    const initStub = sinon.stub();
    shallow(<Game init={initStub} play={noop} autoPlay={noop} shapes={[]} />);

    expect(initStub.calledOnce).toBe(true);
  });

  describe('players rendering', () => {
    it('should render 2 players', () => {
      const wrapper = shallow(<Game init={noop} play={noop} autoPlay={noop} shapes={shapes} players={players} />);

      expect(wrapper.find(Player)).toHaveLength(2);
    });
  });

  describe('Game status', () => {
    it('should have a GameStatus component', () => {
      const wrapper = shallow(<Game init={noop} play={noop} autoPlay={noop} shapes={shapes} />);

      expect(wrapper.find(GameStatus)).toHaveLength(1);
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