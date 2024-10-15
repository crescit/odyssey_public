import React from 'react';
import MerchantBlogPost from './MerchantBlogPost';

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((article, index) => (
        <MerchantBlogPost article={article} key={index} />
      ))}
    </div>
  );
};

export default Posts;