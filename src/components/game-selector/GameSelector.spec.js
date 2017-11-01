import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import { GAME_MODE_COMPUTER, GAME_MODE_USER } from '../../constants/gameMode.constants';
import GameMode from '../game-mode/GameMode';
import GameSelector from './GameSelector';

describe('Game selector component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GameSelector />);
  });

  describe('User mode', () => {
    let link;

    beforeEach(() => {
      link = wrapper.find({ to: '/user' });
    });

    it('should render a link to the /user route', () => {
      expect(link).toHaveLength(1);
      expect(link.type()).toEqual(Link);
    });

    it('should render a GameMode component', () => {
      expect(link.find(GameMode)).toHaveLength(1);
    });

    it('should render a GameMode component with the player1 prop to `user`', () => {
      const mode = link.find(GameMode);
      expect(mode.prop('player1')).toEqual(GAME_MODE_USER);
    });

    it('should render a GameMode component with the player2 prop to `desktop`', () => {
      const mode = link.find(GameMode);
      expect(mode.prop('player2')).toEqual(GAME_MODE_COMPUTER);
    });
  });

  describe('Computer mode', () => {
    let link;

    beforeEach(() => {
      link = wrapper.find({ to: '/computer' });
    });

    it('should render a link to the /computer route', () => {
      expect(link).toHaveLength(1);
      expect(link.type()).toEqual(Link);
    });

    it('should render a GameMode component', () => {
      expect(link.find(GameMode)).toHaveLength(1);
    });

    it('should render a GameMode component with the player1 prop to `desktop`', () => {
      const mode = link.find(GameMode);
      expect(mode.prop('player1')).toEqual(GAME_MODE_COMPUTER);
    });

    it('should render a GameMode component with the player2 prop to `desktop`', () => {
      const mode = link.find(GameMode);
      expect(mode.prop('player2')).toEqual(GAME_MODE_COMPUTER);
    });
  });
});
