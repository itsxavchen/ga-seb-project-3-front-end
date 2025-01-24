import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as postService from '../../services/postService';
import './PostForm.css'

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    category: '',
    text: '',
    image: ''
  });
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setFormData(postData);
    };
    if (postId) fetchPost();
  }, [postId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (postId) {
      props.handleUpdatePost(postId, formData)
    } else {
      props.handleAddPost(formData);
    }
  };


  return (
    <main className='post-form-container'>
      <form onSubmit={handleSubmit}>
        <h2>{postId ? 'Edit Post' : 'Create Post'}</h2>
        <div className='all-four-wrapper'>
          <div className='title-artist-wrapper'>
            <label htmlFor="title-input">Title</label>
            <input
              required
              type="text"
              name="title"
              id="title-input"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="artist-input">Artist</label>
            <input
              required
              type="text"
              name="artist"
              id="artist-input"
              placeholder="Artist"
              value={formData.artist}
              onChange={handleChange}
            />
            <label htmlFor="category-input">Category</label>
          </div>
          <div className='select-image-wrapper'>
            <select className='select-wrapper'
              required
              name="category"
              id="category-input"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled hidden>Select a category</option>
              <option value="Painting">Painting</option>
              <option value="Photography">Photography</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Furniture">Furniture</option>
              <option value="Installation">Installation</option>
            </select>
            <label htmlFor="image-input">Image URL</label>
            <input
              required
              type="text"
              name="image"
              id="image-input"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            <label htmlFor="text-input">Text</label>
          </div>
        </div>
        
        <textarea className='description-textarea'
          required
          type="text"
          name="text"
          id="text-input"
          placeholder="Description"
          value={formData.text}
          onChange={handleChange}
        />
        <button className='submit-btn' type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default PostForm;