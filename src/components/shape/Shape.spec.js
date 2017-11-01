import React from 'react';
import { shallow } from 'enzyme';

import config from '../../config';
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
});