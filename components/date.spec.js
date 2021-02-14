import { mount } from 'enzyme';

import Date from './date';

/** @test {Date Component} */
describe('Date Component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<Date dateString="2021-02-12" />);

    expect(wrapper.find('time')).toHaveLength(1);
  });
});