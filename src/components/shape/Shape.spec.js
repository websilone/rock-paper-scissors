import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

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

  describe('selected prop', () => {
    it('should not have shape.selected css by default', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} />);

      expect(component.find('.selected')).toHaveLength(0);
    });

    it('should have shape.selected css when true', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} selected />);

      expect(component.find('.selected')).toHaveLength(1);
    });
  });

  describe('canBePlayed prop', () => {
    it('should not have shape.canBePlayed css by default', () => {
      const component = shallow(<Shape shape={ROCK_SHAPE} />);

      expect(component.find('.canBePlayed')).toHaveLength(0);
    });

    it('should have shape.canBePlayed css when true', () => {
      const component = shallow(<Shape canBePlayed shape={ROCK_SHAPE} selected />);

      expect(component.find('.canBePlayed')).toHaveLength(1);
    });
  });

  describe('onClick', () => {
    it('should call the onClick prop when clicking on the component', () => {
      const onClickStub = sinon.stub();
      const wrapper = shallow(<Shape shape={ROCK_SHAPE} onClick={onClickStub} />);

      wrapper.simulate('click');

      expect(onClickStub.calledOnce).toBe(true);
    });
  });
});