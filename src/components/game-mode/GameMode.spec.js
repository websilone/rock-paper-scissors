import React from 'react';
import { shallow } from 'enzyme';

import { GAME_MODE_COMPUTER, GAME_MODE_USER } from '../../constants/gameMode.constants';
import GameMode from './GameMode';

describe('Game mode component', () => {
  it('should render an article element', () => {
    const wrapper = shallow(<GameMode player1={GAME_MODE_COMPUTER} player2={GAME_MODE_COMPUTER} />);

    expect(wrapper.is('article')).toBeTruthy();
  });

  it('should have the `message` and `is-primary` css classes', () => {
    const wrapper = shallow(<GameMode player1={GAME_MODE_COMPUTER} player2={GAME_MODE_COMPUTER} />);

    expect(wrapper.hasClass('message')).toBeTruthy();
    expect(wrapper.hasClass('is-primary')).toBeTruthy();
  });

  it('should compose css class from the player1 and player2 props', () => {
    const wrapper = shallow(<GameMode player1={GAME_MODE_USER} player2={GAME_MODE_COMPUTER} />);

    expect(wrapper.find(`.fa-${GAME_MODE_USER}`)).toHaveLength(1);
    expect(wrapper.find(`.fa-${GAME_MODE_COMPUTER}`)).toHaveLength(1);
  });
});
