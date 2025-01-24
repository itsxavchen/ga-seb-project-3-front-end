import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import PostList from './components/PostList/PostList';
import PostDetails from './components/PostDetails/PostDetails';
import PostForm from './components/PostForm/PostForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; 
import * as postService from './services/postService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index();
      setPosts(postsData);
    };
    if (user) fetchAllPosts();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddPost = async (postFormData) => {
    const newPost = await postService.create(postFormData);
    setPosts([newPost, ...posts]);
    console.log('postFormData', postFormData);
    navigate('/xkii');
  };

  const handleDeletePost = async (postId) => {
    const deletedPost = await postService.deletePost(postId);
    setPosts(posts.filter((post) => post._id !== deletedPost._id));
    navigate('/xkii');
  };

  const handleUpdatePost = async (postId, postFormData) => {
    const updatedPost = await postService.updatePost(postId, postFormData)
    setPosts(posts.map((post) => (postId === post._id ? updatedPost : post)));
    navigate(`/xkii/${postId}`);
  };


  // const handleDeleteComment = async (postId, commentId) => {
  //   console.log('commentId:', commentId);
  //   const deletedComment = await postService.deleteComment(postId, commentId);
  //   setPosts(posts.map((post) =>
  //     post._id === postId
  //       ? {
  //           ...post, // Spread the existing post
  //           comments: post.comments.filter((comment) => comment._id !== deletedComment._id)
  //         }
  //       : post // Return the post unchanged if the IDs don't match
  //   ))
  //   navigate(`/xkii/${postId}`);
  // };


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/xkii" element={<PostList posts={posts}/>} />
              <Route path="/xkii/:postId" element={<PostDetails handleDeletePost={handleDeletePost} />} />
              <Route path="/xkii/add" element={<PostForm handleAddPost={handleAddPost} />} />
              <Route path="/xkii/:postId/edit" element={<PostForm handleUpdatePost={handleUpdatePost}/>} />
            </>
          ) : (
            <Route path="/" element={<Landing setUser={setUser}/>} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
