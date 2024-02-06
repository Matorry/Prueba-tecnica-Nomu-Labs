import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useComment } from '../../hooks/use.comment';
import { usePosts } from '../../hooks/use.post';
import { useUsers } from '../../hooks/use.user';
import { CommentNoId } from '../../models/comment';

const CommentForm: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useUsers();
  const { createComment } = useComment();
  const { currentUserFollowingPosts } = usePosts();
  const currentPost = currentUserFollowingPosts.find(
    (element) => element.id === postId
  );

  const [commentData, setCommentData] = useState<CommentNoId>({
    author: currentUser,
    post: currentPost!,
    text: '',
    date: new Date(),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommentData((prevCommentData) => ({
      ...prevCommentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createComment(commentData);
    navigate(`/post/${postId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <input
          type="text"
          name="text"
          value={commentData.text}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
