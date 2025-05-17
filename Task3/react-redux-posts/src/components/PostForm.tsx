import React, { useState } from 'react';
import { useAddPostMutation } from '../services/apiPosts.ts';
import "../styles/postForm.css";

interface PostFormProps {
  onAddPost: (newPost: { title: string; body: string; }) => void;
  onClose: () => void;
  isClosed: boolean;
}

const PostForm = ({ onAddPost, onClose, isClosed }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({ title: false, body: false });
  const [addPost, { isLoading }] = useAddPostMutation();

  const handleBlur = (field: 'title' | 'body') => {
    if (field === 'title') {
      setErrors(prev => ({ ...prev, title: title.trim() === '' }));
    } else if (field === 'body') {
      setErrors(prev => ({ ...prev, body: body.trim() === '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasTitleError = title.trim() === '';
    const hasBodyError = body.trim() === '';

    if (hasTitleError || hasBodyError) {
      setErrors({ title: hasTitleError, body: hasBodyError });
      return;
    }

    try {
      const newPost = await addPost({ title, body}).unwrap();
      onAddPost(newPost);
      onClose();
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Add post failed:', error);
    }
  };

  return (
    <div className={`form-cover ${isClosed ? 'isClosed' : ''}`} onClick={onClose}>
        <form className="posts-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <h2 className="form-title">Add Post Form</h2>

            {/* title */}
            <div className="form-group">
                <span className="form-label">Title</span>
                <input 
                  className="form-input" 
                  value={title} 
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors(prev => ({ ...prev, title: false }));
                  }}
                  placeholder="Title" onBlur={() => handleBlur('title')}/>
                <span className={`form-error ${errors.title ? 'visible' : ''}`}>Title cannot be empty</span>
            </div>

            {/* body */}
            <div className="form-group">
                <span className="form-label">Body</span>
                <textarea 
                  className="form-area" 
                  value={body} 
                  onChange={(e) => {
                    setBody(e.target.value);
                    setErrors(prev => ({ ...prev, body: false }));
                  }}
                  placeholder="Body" onBlur={() => handleBlur('body')}/>
                <span className={`form-error ${errors.body ? 'visible' : ''}`}>Body cannot be empty</span>
            </div>

            <button className="form-sbumit" type="submit" disabled={isLoading}>Add Post</button>
        </form>
    </div>
  );
};

export default PostForm;
