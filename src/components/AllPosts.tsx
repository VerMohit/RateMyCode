import { useEffect, useState } from 'react';
import { Box, Title } from '@mantine/core';
import { getBaseUrlClientSide } from '@/utils/baseUrl';

type PostsType = {
  title: string;
  slug: string;
  description: string;
  codeSnippet: string;
  authorId: string;
  rating: {
    avgRating: number;
    noOfRatings: number;
  };
  comments: {
    userId: number;
    comment: string;
  };
};

export const AllPosts = () => {
  const [posts, setPosts] = useState<PostsType[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseUrl = getBaseUrlClientSide();
        const response = await fetch(`${baseUrl}/getPosts`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();
        // console.log(posts);
        setPosts(posts);
      } catch (error) {
        console.log('There was a problem fetching the posts: ', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Title>Posts</Title>
      <div>AllPosts</div>
      {posts.map((post) => (
        <Box py="1rem">
          <div>{post.title}</div>
          <div>{post.description}</div>
          <div>Rating: {post.rating.avgRating}</div>
        </Box>
      ))}
    </div>
  );
};
