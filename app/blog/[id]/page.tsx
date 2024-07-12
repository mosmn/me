import React from 'react';
import { getPost } from '@/lib/data';
import { ContentDisplayer } from '@/components/content-displayer';
import CommentSection from '@/components/sections/CommentSection';
import { format } from 'date-fns';

const BlogPostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mt-20 px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 pr-[12px] pl-[12px]">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8 pr-[12px] pl-[12px]"> {format(new Date(post.createdAt), 'PPPp')}</p>
        <ContentDisplayer content={post.content} style={{ fontSize: '1.125rem', border: 'none', margin: '0', maxWidth: '100%', overflow: 'hidden', paddingLeft: '12px', paddingRight: '12px' }} />
      </div>
      <CommentSection postId={id} />
    </div>
  );
};

export default BlogPostPage;