import { Link } from 'react-router-dom';
import "./PostList.css";
import { useState } from "react";


const PostList = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleChange = (evt) => {
    setSelectedCategory(evt.target.value);
  };
 
  const filteredposts = selectedCategory.toLowerCase() === "all"
    ? props.posts
    : props.posts.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
  
  return (
    <>
    <div className='filters-wrapper'>
        <button className={selectedCategory === "All" ? "active-button" : ""} value="All" onClick={handleChange}>ALL</button>
        <button className={selectedCategory === "Painting" ? "active-button" : ""} value="Painting" onClick={handleChange}>PAINTING</button>
        <button className={selectedCategory === "Photography" ? "active-button" : ""} value="Photography" onClick={handleChange}>PHOTOGRAPHY</button>
        <button className={selectedCategory === "Sculpture" ? "active-button" : ""} value="Sculpture" onClick={handleChange}>SCULPTURE</button>
        <button className={selectedCategory === "Furniture" ? "active-button" : ""} value="Furniture" onClick={handleChange}>FURNITURE</button>
        <button className={selectedCategory === "Installation" ? "active-button" : ""} value="Installation" onClick={handleChange}>INSTALLATION</button>
    </div>
    
    <div className='image-grid'>
      {filteredposts && filteredposts.length > 0 ? (
      filteredposts.map((post, index) => (
        <div className='image-item'key={post._id}>
          <Link to={`/xkii/${post._id}`}>
            <img className="post-image" src={post.image} alt={post.title} />
            <h2>{String(index + 1).padStart(2, '0')}</h2>
          </Link>
        </div>
      ))
      ) : (
        <p>No posts found</p>
      )}
    </div>

    </>
  );
};

export default PostList;