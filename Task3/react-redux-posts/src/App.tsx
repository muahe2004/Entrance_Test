import './App.css';
import Post from './components/Post.tsx';
import PostForm from './components/PostForm.tsx';
import { useGetPostsQuery } from './services/apiPosts.ts';
import { useState, useEffect } from 'react';
import { Post as PostType } from './services/apiPosts.ts';
import Alert from './components/Alert.tsx';

function App() {
  const { data: fetchedPosts, isLoading, error } = useGetPostsQuery();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isClosedForm, setIsClosedForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Khi dữ liệu API load xong, set vào state
  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  // Hàm này sẽ được gọi sau khi thêm thành công
  const handleAddPost = (newPost: PostType) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000); // Tự ẩn sau 3s
  };

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {(error as any).message}</p>;

  // Ẩn hiện PopUp
  // const [isClosedAddDone, setIsClosedAddDone] = useState(true);
  // const handleOpenAddDone = () => { setIsClosedAddDone(false)};
  // const handleCloseAddDone = () => { setIsClosedAddDone(true)};

  const handleOpenForm = () => { setIsClosedForm(false)};
  const handleCloseForm = () => { setIsClosedForm(true)};

  return (
    <div className="app-content">

      <PostForm isClosed={isClosedForm} onClose={handleCloseForm} onAddPost={handleAddPost}></PostForm>
      {showSuccess && <Alert className="success show" message="Post added successfully!" />}
      
      <div className="app-action">
        <div className="app-action__group">
          <button onClick={handleOpenForm} className="app-action__btn">
            <svg 
              className="app-action__icon"
              width="18px" 
              height="18px" fill="currentColor" 
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
            </svg>
            <span>Add Post</span>
          </button>
        </div>
      </div>
      <div className="app-inner">
        {
          posts?.map((post) => (
            <Post title={post.title} body={post.body}></Post>
          ))
        }

      </div>
      
    </div>
  );
}

export default App;
