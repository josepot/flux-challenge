import React from 'react';
import Button from './button';
import renderer from 'react-test-renderer';


test('Button has child when label prop is indicated', () => {
  const component = renderer.create(
    <Button onClick={() => console.log("HOLA")} label="probando" className="class"></Button>,
  );
  let tree = component.toJSON();
  expect(tree.children).not.toBeNull();
});
