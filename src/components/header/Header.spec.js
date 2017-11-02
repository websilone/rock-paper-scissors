import React from 'react';
import { shallow } from 'enzyme';

import I18N from '../../i18n';
import Header from './Header';

describe('Header component', () => {
  it('should render the title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.text()).toBe(I18N.headerTitle);
  });
});