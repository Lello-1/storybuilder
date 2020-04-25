import React from 'react';
import {fireEvent, render, getByTestId,  getByText, wait } from '@testing-library/react';
import AddStory from '../src/components/AddStory/AddStory';
import { StaticRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { postStory } from '../src/ApiService';


jest.mock('../src/ApiService');
const fakeApiRequest = Promise.resolve({
  secure_url: 'https://example.com/'
});
postStory.mockImplementation(() => fakeApiRequest);


it('should send data-story to cloudinary on submit', () => {
  const context = {};
  const { container } = render(
    <StaticRouter location="somelocation" context={context}>
      <AddStory />
    </StaticRouter>
  );
  const titleElement = getByText(container, 'Write a title');
  fireEvent(titleElement, new MouseEvent('click', { bubbles: true, cancelable: true}));
  const titleInput = getByTestId(container, 'title-text');
  fireEvent.change(titleInput, { target: { value: 'HELLLOOO'}});
  fireEvent.keyDown(titleInput, { key: 'Enter', code: 'Enter' });

  const yearElement = getByText(container, 'Year');
  fireEvent(yearElement, new MouseEvent('click', { bubbles: true, cancelable: true}));
  const yearInput = getByTestId(container, 'year-text');
  fireEvent.change(yearInput, { target: { value: '2020'}});
  expect(yearInput.value).toEqual('2020');
  fireEvent.keyDown(yearInput, { key: 'Enter', code: 'Enter' });
  
  const descElement = getByText(container, 'Description for the task');
  fireEvent(descElement, new MouseEvent('click', { bubbles: true, cancelable: true}));
  const descInput = getByTestId(container, 'desc-textarea');
  fireEvent.change(descInput, { target: { value: 'this is a description'}});
  expect(descInput.value).toEqual('this is a description');
});

it('should submit form values to API and redirect page', async () => {
  let history = createMemoryHistory({ initialEntires: ['/storypage'] });
  const { container } = render(
    <Router history={history}>
      <AddStory />
    </Router>
  );
  await wait(() => fireEvent.click(getByTestId(container, 'submit-button')));
  expect(postStory).toHaveBeenCalled();
  expect(history.location.pathname).toBe('/stories');
});
