import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { noop } from 'lodash';

import config from '../../config';
import Shape from '../shape/Shape';
import Player from './Player';

const { ROCK_SHAPE, PAPER_SHAPE } = config;

describe('Player component', () => {
  const shapes = [ROCK_SHAPE, PAPER_SHAPE];
  const player = { selectedShape: null, canPlay: true, icon: 'user' };

  describe('Play', () => {
    describe('Click on a shape', () => {
      it('should call the play action with the right payload', () => {
        const playActionStub = sinon.stub();
        const wrapper = shallow(<Player player={player} playerKey="player1" play={playActionStub} shapes={shapes} />);

        const firstShape = wrapper.find(Shape).first();
        firstShape.simulate('click');

        expect(playActionStub.calledOnce).toBe(true);
        expect(playActionStub.calledWith('player1', firstShape.prop('shape'))).toBe(true);
      });
    });
  });

  describe("shapes rendering", () => {
    it('should render the right number of shapes', () => {
      const wrapper = shallow(<Player player={player} playerKey="player1" play={noop} shapes={shapes} />);

      expect(wrapper.find(Shape)).toHaveLength(shapes.length);
    });
  });

  describe("icon rendering", () => {
    it('should render the right icon', () => {
      const wrapper = shallow(<Player player={player} playerKey="player1" play={noop} shapes={shapes} />);

      expect(wrapper.find('.tag .icon .fa-user')).toHaveLength(1);
    });
  });
});