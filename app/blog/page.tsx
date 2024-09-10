import React from 'react';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/data';
import {ContentDisplayer} from '@/components/content-displayer';
import { ArrowRightIcon } from 'lucide-react';
import { format } from 'date-fns';

const Page = async () => {
    const posts = await getPublishedPosts();
    console.log("Posts", posts);
    return (
        <div className="container mt-24 px-4 py-12 md:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: any) => (
                    <div key={post._id} className="bg-background rounded-lg shadow-lg overflow-hidden dark:shadow-foreground border border-gray">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">
                                <Link href="/blog/[id]" as={`/blog/${post._id}`} className="text-primary hover:underline" prefetch={false}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                {format(new Date(post.createdAt), 'PPPp')}
                            </p>
                            <p className="text-muted-foreground mb-4" style={{ maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <ContentDisplayer content={post.content} style={{ border: 'none', padding: '0', margin: '0' }} />
                            </p>
                            <Link href="/blog/[id]" as={`/blog/${post._id}`} className="inline-flex items-center text-primary font-medium hover:underline" prefetch={false}>
                                Read More
                                <ArrowRightIcon />
                            </Link>
                        </div>
                        <div className="p-6 border-t">
                            <p className="text-muted-foreground">
                                {post.likesCount} likes
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;