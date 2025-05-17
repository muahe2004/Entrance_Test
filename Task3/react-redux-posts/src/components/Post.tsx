// Post.jsx
import React from "react";
import "../styles/post.css";

// const Post = ({ id, userId, title, body}) => {
const Post = ({ title, body}) => {
  return (
    <div className="post">
      <div className="post-title">
        <span>{title}</span>
      </div>
      <div className="post-body">
        <span>{body}</span>
      </div>
    </div>
  );
};

export default Post;
