import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as postService from '../../services/postService';
import { useParams, useNavigate } from 'react-router';
import CommentForm from '../CommentForm/CommentForm';
import { Link } from 'react-router-dom';
import './PostDetails.css';

const PostDetails = (props) => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();
  
  const handleAddComment = async (commentFormData) => {
    const newComment = await postService.createComment(postId, commentFormData);
    setPost({ ...post, comments: [...post.comments, newComment] });
  };

    const handleDeleteComment = async (postId, commentId) => {
      console.log('commentId:', commentId);
      const deletedComment = await postService.deleteComment(postId, commentId);
      setPost(props.posts.map((post) =>
        post._id === postId
          ? {
              ...post, // Spread the existing post
              comments: post.comments.filter((comment) => comment._id !== deletedComment._id)
            }
          : post // Return the post unchanged if the IDs don't match
      ))
      navigate(`/xkii/${postId}`);
    };

    const handleUpdateComment = async (postId, commentId, commentFormData) => {
    const updatedComment = await postService.updateComment(postId, commentId, commentFormData);
      setPost(props.posts.map((post) =>
        post._id === postId
          ? {
              ...post, 
              comments: post.comments.map((comment) =>
                comment._id === updatedComment._id ? updatedComment : comment 
              )
            }
          : post 
      ));
      navigate(`/xkii/${postId}`);
    };
  
  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      console.log('postData', postData);
      setPost(postData);
    };
    fetchPost();
  }, [postId]);

  console.log('post state:', post);

  if (!post) return <main>Loading...</main>;

  return (
    <main className='post-detail-wrapper'>
      <div className='left-wrapper'>
        <div className='three-wrapper'>
          <div className='detail-wrapper'>
            <h3 className='title-font'>Title</h3>
            <h3>{post.title}</h3>
          </div>
          <div className='detail-wrapper'>
            <h3 className='title-font'>Artist</h3>
            <h3>{post.artist}</h3>
          </div>
          <div className='detail-wrapper'>
            <h3 className='title-font'>Date</h3>
            <h3>{new Date(post.createdAt).toLocaleDateString()} by {post.author.username}</h3>
          </div>
        </div>
        
        <div className='comments-wrapper'>
          <h3 className='title-font'>Comments</h3>
            <CommentForm handleAddComment={handleAddComment}/>
            {post.comments.length === 0 ? (
              <p></p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment._id}>
                  <header>
                    <p>
                      {comment.author.username} posted on
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    {comment.author._id === user._id && (
                      <div className='edit-delete-comments-btn-wrapper'>
                        <button onClick={() => handleUpdateComment(postId, comment._id)}>Edit</button>
                        <button onClick={() => handleDeleteComment(postId, comment._id)}>Delete</button>
                      </div>
                    )}
                  </header>
                  <p>{comment.text}</p>
                </div>
              ))
            )}
        </div>



          
      </div>

      <div className='right-wrapper'>
        <img className='post-detail-image'src={post.image} />
        <div className='edit-delete-container'>
            {post.author._id === user._id && (
            <div className='edit-delete-wrapper'>
            <Link to={`/xkii/${postId}/edit`}><img src="/images/pencil.svg" alt="close button" /></Link>
            <button className='delete-btn' onClick={() => props.handleDeletePost(postId)}><img src="/images/bin.svg" alt="delete button" /></button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
};

export default PostDetails;

