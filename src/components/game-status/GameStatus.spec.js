import React from 'react';
import { shallow } from 'enzyme';

import {
  GAME_STATUS_START,
  GAME_STATUS_WIN,
  GAME_STATUS_LOSS,
  GAME_STATUS_TIE,
} from '../../constants/gameStatus.constants';
import I18N from '../../i18n';
import GameStatus from './GameStatus';

describe('GameStatus component', () => {
  describe('No status', () => {
    it('should not render', () => {
      const wrapper = shallow(<GameStatus status={null} />);

      expect(wrapper.equals(null)).toBe(true);
    });
  });

  describe('Start status', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<GameStatus status={GAME_STATUS_START} />);
    })

    it('should render the start message', () => {
      expect(wrapper.text()).toEqual(I18N.gameStatus.start);
    });

    it('should render the handshake icon', () => {
      expect(wrapper.find('.fa-handshake-o')).toHaveLength(1);
    });
  });
  
  describe('Win status', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<GameStatus status={GAME_STATUS_WIN} />);
    })

    it('should render the win message', () => {
      expect(wrapper.text()).toEqual(I18N.gameStatus.win);
    });

    it('should render the thumbs-up icon', () => {
      expect(wrapper.find('.fa-thumbs-up')).toHaveLength(1);
    });
  });

  describe('Loss status', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<GameStatus status={GAME_STATUS_LOSS} />);
    })

    it('should render the loss message', () => {
      expect(wrapper.text()).toEqual(I18N.gameStatus.loss);
    });

    it('should render the thumbs-down icon', () => {
      expect(wrapper.find('.fa-thumbs-down')).toHaveLength(1);
    });
  });

  describe('Tie status', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<GameStatus status={GAME_STATUS_TIE} />);
    })

    it('should render the tie message', () => {
      expect(wrapper.text()).toEqual(I18N.gameStatus.tie);
    });

    it('should render the thumbs-down icon', () => {
      expect(wrapper.find('.fa-meh-o')).toHaveLength(1);
    });
  });
});
