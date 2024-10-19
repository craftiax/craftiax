import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

const CommentSection = ({
  comments: initialComments,
}: {
  comments: Comment[];
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: "Current User", // In a real app, this would be the logged-in user
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Comments</h2>
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
            <p className="font-semibold text-white">{comment.author}</p>
            <p className="text-gray-300">{comment.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmitComment} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-2 mb-2"
          rows={3}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
