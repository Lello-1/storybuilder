import React from 'react';
import {fireEvent, render, screen, getByPlaceholderText, queryByAttribute, getNodeText, getByTitle, getByLabelText, getByTestId } from '@testing-library/react';
import { StaticRouter } from 'react-router'

import StoryItem from '../src/components/StoryItem/StoryItem';


test('renders component without crashing', () => {
  const story = {_id: 1, year: 1992, photos: ['photo']};
  const context = {};
  const component = render(
    <StaticRouter location="somelocation" context={context}>
      <StoryItem story={story} />
    </StaticRouter>
  );
});

it("should render the p element with the year passed in story", () => {
  const story = {_id: 1, year: 1992, photos: ['photo']};
  const context = {};
  const {getByTestId} = render(
    <StaticRouter location="somelocation" context={context}>
      <StoryItem story={story} />
    </StaticRouter>
  );
  const testP = getByTestId("yearly p");
  expect(testP.textContent).toEqual("1992");  
});