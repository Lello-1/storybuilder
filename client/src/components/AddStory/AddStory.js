import React, { useRef, useState } from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';
import Editable from '../Editable/Editable';
import { postStory } from '../../ApiService';
import { useHistory } from 'react-router-dom';

import './AddStory.css';

export const AddStory = () => {
  const titleRef = useRef();
  const yearRef = useRef();
  const descriptionRef = useRef();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [story, setStory] = useState([]);
  let history = useHistory();

  const onSubmit = async (e) => {
    // post images to cloudinary
    e.preventDefault();
    const promises_img = images.map((image) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);

      return fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },

        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          return data.secure_url;
        })
        .catch((err) => console.error(err));
    });
    const images_url = await Promise.all(promises_img);

    // send all the data to backend including url's from cloudinary
    createStory(title, description, year, images_url);

    // redirect to storiespage
    history.push('/stories');
  };

  function createStory(title, description, year, photos) {
    postStory({ title, description, year, photos }).then((story) => {
      setStory((stories) => [...stories, story]);
    });
  }

  return (
    <>
      <form onSubmit={createStory}>
        <h1>Add Your Story</h1>
        <Editable text={title} placeholder="Write a title" type="input" data-testid = "editable-text">
          <input
            data-testid = "title-text"
            type="text"
            name="title"
            placeholder="Write a title"
            childref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Editable>
        <Editable text={year} placeholder="Year" type="input">
          <input
            data-testid = "year-text"
            type="text"
            name="year"
            placeholder="Describe the story"
            childref={yearRef}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Editable>
        <Editable
          text={description}
          placeholder="Description for the task"
          type="textarea"
        >
          <textarea
            data-testid = "desc-textarea"
            name="description"
            placeholder="Description for the task"
            childref={descriptionRef}
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Editable>
        <ImageUploader setImages={setImages} />
        <input
          data-testid = "submit-button"
          type="submit"
          className="submit-story"
          name="Save"
          onClick={onSubmit}
        />
      </form>
    </>
  );
};

export default AddStory;
