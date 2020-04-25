import React from 'react'; 
import Editable from '../src/components/Editable/Editable';
import {fireEvent, render, getByTestId } from '@testing-library/react';

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
