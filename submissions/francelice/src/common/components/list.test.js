import React from 'react';
import List from './list';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('actions', () => {

  test(`MyComponent renders with default props`, () => {
    const wrapper = shallow(<List />);
    expect(wrapper).toMatchSnapshot();
  });

  test('List has childs if content is not empty', () => {
    const component = renderer.create(
      <List content={[1,2,3]}></List>,
    );
    let tree = component.toJSON();
    expect(tree.children).not.toBeNull();
  });
  

});
