// "use client";

// import React, { useState, useEffect } from "react";
// import { CommentEditor } from "../comment-editor";
// import { TooltipProvider } from "@/components/plate-ui/tooltip";
// import { ContentDisplayer } from '@/components/content-displayer';
// import { getComments } from "@/lib/data";
// import { format } from 'date-fns';
// import { useAuth } from '@/app/context/AuthProvider';
// import { Button } from "@/components/ui/button"
// import {ThumbsUp} from "lucide-react";

// const CommentSection = ({ postId }: { postId: string }) => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   const fetchComments = async () => {
//     setLoading(true);
//     const fetchedComments = await getComments(postId);
//     console.log(fetchedComments);
//     setComments(fetchedComments);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [postId]);

//   const handleNewComment = () => {
//     fetchComments();
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-12 border-t border-gray-200 pt-8">
//       <div className="ml-4 mt-2">
//                 {user ? (
//                   <div className="flex items-center mb-2">
//                   <div className="w-8 h-8 rounded-full bg-gray-200"></div>
//                   <div className="ml-2">
//                     <div className="flex space-x-2">
//                       <div className="text-sm font-medium">{user?.username}</div>
//                     </div>
//                   </div>
//                 </div>
//                 ) : (
//                   <div className="text-sm font-medium">Please login to comment</div>
//                 )}
//                 <div className="ml-10">
//                 <TooltipProvider disableHoverableContent delayDuration={500} skipDelayDuration={0}>
//                   <CommentEditor postId={postId} onNewComment={handleNewComment} replyTo={null} />
//                 </TooltipProvider>
//                 </div>
//           </div>
//       <div className="mt-8 clear-both">
//         {loading ? <p>Loading comments...</p> : <CommentsDisplayer comments={comments} onNewComment={handleNewComment} />}
//       </div>
//     </div>
//   );
// };

// const CommentsDisplayer = ({ comments, onNewComment }: { comments: any[], onNewComment: () => void }) => {
//   const [openReplyId, setOpenReplyId] = useState<string | null>(null);
//   const mainComments = comments.filter(comment => !comment.replyTo);

//   const toggleReplyEditor = (commentId: string) => {
//     setOpenReplyId(prevId => prevId === commentId ? null : commentId);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
//       {mainComments.map((comment: any) => (
//         <div key={comment._id} className="mb-4">
//           <div className="flex items-center mb-2">
//             <div className="w-8 h-8 rounded-full bg-gray-200"></div>
//             <div className="ml-2">
//               <div className="flex space-x-2">
//                 <div className="text-sm font-medium">{comment.author.username}</div>
//                 <div className="text-xs text-gray-500">{format(new Date(comment.createdAt), 'PPPp')}</div>
//               </div>
//             </div>
//           </div>
//           <div className="ml-10">
//             <ContentDisplayer content={comment.content} />
//             <div className="flex">
//           <Button variant="link" className="text-sm"><span className="mr-2">{comment.likesCount}</span><ThumbsUp size={16} /></Button>
//           <Button variant="link" className="text-sm" onClick={() => toggleReplyEditor(comment._id)}>Reply</Button>
//         </div>
//         {openReplyId === comment._id && (
//           <ReplyEditor postId={comment.post} replyTo={comment._id} onNewComment={onNewComment} />
//         )}
//             {comment.replies.map((reply: any) => (
//               <div key={reply._id} className="ml-4 mt-2">
//                 <div className="flex items-center mb-2">
//                   <div className="w-8 h-8 rounded-full bg-gray-200"></div>
//                   <div className="ml-2">
//                     <div className="flex space-x-2">
//                       <div className="text-sm font-medium">{reply.author.username}</div>
//                       <div className="text-xs text-gray-500">{format(new Date(reply.createdAt), 'PPPp')}</div>
//                     </div>
//                     <div className="text-xs text-gray-500">Replying to <span className="text-sm">{reply.replyTo?.username}</span></div>
//                   </div>
//                 </div>
//                 <div className="ml-10">
//                   <ContentDisplayer content={reply.content} />
//                   <div className="flex">
//                     <Button variant="link" className="text-sm"><span className="mr-2">{comment.likesCount}</span><ThumbsUp size={16} /></Button>
//                     <Button variant="link" className="text-sm" onClick={() => toggleReplyEditor(reply._id)}>Reply</Button>
//                     </div>
//                     {openReplyId === reply._id && (
//                       <ReplyEditor postId={reply.post} replyTo={reply._id} onNewComment={onNewComment} />
//                     )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const ReplyEditor = ({ postId, replyTo, onNewComment }: { postId: string, replyTo: string, onNewComment: () => void }) => {

//   return (
//     <div className="ml-10">
//       <TooltipProvider disableHoverableContent delayDuration={500} skipDelayDuration={0}>
//         <CommentEditor postId={postId} onNewComment={onNewComment} replyTo={replyTo} />
//       </TooltipProvider>
//     </div>
//   );
// }

// export default CommentSection;

"use client";

import React, { useState, useEffect } from "react";
import { CommentEditor } from "../comment-editor";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { ContentDisplayer } from "@/components/content-displayer";
import { getComments, getReplies } from "@/lib/data";
import { format } from "date-fns";
import { useAuth } from "@/app/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

interface User {
  _id: string;
  username: string;
}

interface Comment {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
  likesCount: number;
  replyTo: string | null;
}

interface CommentSectionProps {
  postId: string;
}

interface CommentThreadProps {
  comment: Comment;
  postId: string;
  onNewComment: () => void;
}

interface CommentProps {
  comment: Comment;
  onReply: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const fetchComments = async () => {
    setLoading(true);
    const fetchedComments = await getComments(postId);
    console.log("Fetched comments:", fetchedComments);
    setComments(fetchedComments);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleNewComment = () => {
    fetchComments();
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
      {user ? (
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="ml-4">
            <div className="flex space-x-2">
              <div className="text-lg font-medium">{user.username}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-lg font-medium">Please login to comment</div>
      )}
      <div>
        <TooltipProvider
          disableHoverableContent
          delayDuration={500}
          skipDelayDuration={0}
        >
          <CommentEditor
            postId={postId}
            onNewComment={handleNewComment}
            replyTo={null}
          />
        </TooltipProvider>
      </div>
      <div className="mt-20 space-y-8">
        {loading ? (
          <div className="text-center">
            <p>Loading comments...</p>
          </div>
        ) : (
          comments
            .filter((comment) => !comment.replyTo)
            .map((comment) => (
              <CommentThread
                key={comment._id}
                comment={comment}
                postId={postId}
                onNewComment={handleNewComment}
              />
            ))
        )}
      </div>
    </div>
  );
};

const CommentThread: React.FC<CommentThreadProps> = ({
  comment,
  postId,
  onNewComment,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showReplyEditor, setShowReplyEditor] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>([]);

  const toggleReplyEditor = () => setShowReplyEditor(!showReplyEditor);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchReplies = async () => {
      const replies = await getReplies(postId, comment._id);
      setReplies(replies);
      console.log("Fetched replies:", replies);
    };

    if (comment._id) fetchReplies();
  }, []);

  return (
    <div className="border-l-2 border-gray-500 pl-4">
      <Comment comment={comment} onReply={toggleReplyEditor} />
      {showReplyEditor && (
        <div className="mt-4 ml-8">
          <TooltipProvider
            disableHoverableContent
            delayDuration={500}
            skipDelayDuration={0}
          >
            <CommentEditor
              postId={postId}
              onNewComment={() => {
                onNewComment();
                setShowReplyEditor(false);
              }}
              replyTo={comment._id}
            />
          </TooltipProvider>
        </div>
      )}
      {replies.length > 0 && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpanded}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <ChevronUp className="mr-1" />
            ) : (
              <ChevronDown className="mr-1" />
            )}
            {isExpanded ? "Hide" : "Show"} {replies.length}{" "}
            {replies.length === 1 ? "reply" : "replies"}
          </Button>
          {isExpanded && (
            <div className="space-y-4 mt-4">
              {replies.map((reply) => (
                <CommentThread
                  key={reply._id}
                  comment={reply}
                  postId={postId}
                  onNewComment={onNewComment}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
  if (!comment.author) {
    console.error("Comment author is undefined:", comment);
    return null;
  }

  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{comment.author.username}</span>
          <span className="text-sm text-gray-500">
            {format(new Date(comment.createdAt), "PPp")}
          </span>
        </div>
        <div className="mt-2">
          <ContentDisplayer content={comment.content} />
        </div>
        <div className="mt-2 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ThumbsUp className="mr-1" size={16} />
            <span>{comment.likesCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReply}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <MessageCircle className="mr-1" size={16} />
            <span>Reply</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
