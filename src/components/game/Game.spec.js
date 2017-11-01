import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Game from './Game';

describe('Game component', () => {
  it('should call the init prop on componentDidMount', () => {
    const initStub = sinon.stub();
    shallow(<Game init={initStub} shapes={[]} />);

    expect(initStub.calledOnce).toBe(true);
  });
});