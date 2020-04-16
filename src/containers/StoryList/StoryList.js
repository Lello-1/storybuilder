import React from 'react';
import { Link } from 'react-router-dom';

export const StoryList = () => {
  return (
    <div className="story-list">
      <h1>My Stories</h1>
      <div className="story">
        <h2 className="text-black">
          <Link to="/storypage">A Day At The Races</Link>
        </h2>
        <p className="text-gray">2018</p>
        <img src="https://via.placeholder.com/150" alt="some picture" />
      </div>
      <div className="story">
        <h2>With the family to the zoo</h2>
        <p>2017</p>
        <img src="https://via.placeholder.com/150" alt="some picture" />
      </div>
      <div className="story">
        <h2>My daughters birthday party</h2>
        <p>2018</p>
        <img src="https://via.placeholder.com/150" alt="some picture" />
      </div>
    </div>
  );
};

export default StoryList;
