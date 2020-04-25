import React from 'react'; 
import Editable from '../src/components/Editable/Editable';
import renderer from 'react-test-renderer';
import {fireEvent, render, screen, getByPlaceholderText, queryByAttribute, getNodeText, getByTitle, getByLabelText, getByTestId } from '@testing-library/react';

// test('at rendering editing should be false', () => {
//   const { container } = render(
//     <Editable text="test text" type="test_type">
//       <input data-testid='testid'/>
//     </Editable>
//   );
//   // console.log(getByLabelText(container, 'labeltest'));
//   const element = container.querySelector('div[class=editable-test_type] > span');
//   const text = getNodeText(element);
//   // console.log(text);
//   fireEvent(element, new MouseEvent('click', { bubbles: true, cancelable: true}));
//   // console.log(getByTestId(container, 'testid'));
//   getByTestId(container, 'testid')
  
// });

it('should render without crashing', () => {
  const { container } = render(
    <Editable text="test text" />
  );
});

it('should call functions on event', () => {
  // const component = renderer.create(
  //   <Editable/>
  // );
  // const tree = component.toJSON();
  // console.log(tree.);


  const { getByTestId } = render(
    <Editable text="test text" type="test_type">
      <input data-testid='testid'/>
    </Editable>
  );
  const div = getByTestId('editable');
  fireEvent(div, new MouseEvent('click'));
  const component = render( <Editable text="test text" type="test_type"/>
  )

  console.log(component)
  // fireEvent(element, new MouseEvent('click', { bubbles: true, cancelable: true}));
  // getByTestId(container, 'testid');
  // console.log(container)
  // expect(container.state.isEditing).toEqual(true);

  // fireEvent(element, new MouseEvent('click', { bubbles: true, cancelable: true}));
});


it('should properly handle keydown event and revert view to editable', () => {
  const { container } = render(
    <Editable text="test text" type="test_type">
      <input data-testid='testid'/>
    </Editable>
  );
  const editableElement = getByTestId(container, 'editable');
  fireEvent(editableElement, new MouseEvent('click', { bubbles: true, cancelable: true}));
  const notEditableElement = getByTestId(container, 'div handleKeyDown');
  fireEvent.keyDown(editableElement, { key: 'Enter', code: 'Enter' });
  getByTestId(container, 'editable');
});
