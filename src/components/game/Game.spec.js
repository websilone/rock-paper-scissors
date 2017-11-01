import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import config from '../../config';
import Game from './Game';
import Shape from '../shape/Shape';

const { ROCK_SHAPE, PAPER_SHAPE } = config;

describe('Game component', () => {
  it('should call the init prop on componentDidMount', () => {
    const initStub = sinon.stub();
    shallow(<Game init={initStub} shapes={[]} />);

    expect(initStub.calledOnce).toBe(true);
  });

  describe('shapes rendering', () => {
    it('should render 2 sets of available shapes', () => {
      const shapes = [ROCK_SHAPE, PAPER_SHAPE];
      const wrapper = shallow(<Game init={() => {}} shapes={shapes} />);

      expect(wrapper.find(Shape)).toHaveLength(shapes.length*2);
    });
  });
});