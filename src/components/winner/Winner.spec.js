import React from 'react';
import { shallow } from 'enzyme';

import I18N from '../../i18n';
import {
  GAME_STATUS_TIE,
  GAME_STATUS_START,
  GAME_STATUS_WIN,
} from '../../constants/gameStatus.constants';
import Winner from './Winner';

describe('Winner component', () => {
  const PLAYERS = {
    PLAYER1: { name: 'player1' },
    PLAYER2: { name: 'player2' },
  };

  describe('With a winner', () => {
    it('should render the winner s name', () => {
      const wrapper = shallow(<Winner winner="PLAYER1" players={PLAYERS} status={GAME_STATUS_WIN} />);

      expect(wrapper.text()).toBe('player1 wins !');
    });
  });

  describe('With a tie', () => {
    it('should render the tie message', () => {
      const wrapper = shallow(<Winner winner={null} players={PLAYERS} status={GAME_STATUS_TIE} />);

      expect(wrapper.text()).toBe(I18N.gameStatus.tie);
    });
  });

  describe('Before starting the game', () => {
    it('should render the start message', () => {
      const wrapper = shallow(<Winner winner={null} players={PLAYERS} status={GAME_STATUS_START} />);

      expect(wrapper.text()).toBe(I18N.gameStatus.start);
    });
  });
});