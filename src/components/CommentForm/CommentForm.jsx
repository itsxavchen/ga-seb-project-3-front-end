import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';
import { useParams } from 'react-router';
import './CommentForm.css'

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { postId, commentId } = useParams();


  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      // Find comment in fetched post data
      setFormData(postData.comments.find((comment) => comment._id === commentId));
    };
    if (postId && commentId) fetchPost();
  }, [postId, commentId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ text: '' });
  };

  return (
    <form  className='comment-form'onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        className='comment-textarea'
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button className='submit-btn'type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;