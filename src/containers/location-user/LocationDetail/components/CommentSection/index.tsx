import React, { useState } from 'react';

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<
    { name: string; content: string; time: string }[]
  >([]);
  const [commentInput, setCommentInput] = useState<string>('');
  const handleAddComment = () => {
    if (commentInput.trim()) {
      const now = new Date();
      const time = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      const name = 'User';
      setComments([...comments, { name, content: commentInput, time }]);
      setCommentInput('');
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-10 px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-black">Bình luận</h2>
      <div className="mt-6 bg-zinc-100 p-6 rounded-lg shadow-md">
        <textarea
          className="w-full p-4 bg-white text-black rounded-lg border border-gray-300 mb-4"
          placeholder="Nhập bình luận của bạn..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300"
          onClick={handleAddComment}
        >
          Gửi bình luận
        </button>

        <div className="mt-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p className="text-lg md:text-xl text-black font-bold">
                  {comment.name}
                </p>
                <p className="text-sm md:text-base text-gray-500 mb-2">
                  {comment.time}
                </p>
                <p className="text-lg md:text-xl text-black">
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-lg md:text-xl text-gray-500">
              Chưa có bình luận nào.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
