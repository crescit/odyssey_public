import React from 'react';
import marked from 'marked';

const MerchantBlogPost = ({ article }) => {
  const { businessname, businessdescription, businessimage, businessdate } = article.fields;
  const postDescription = marked(businessdescription)

  return (
    <div>
      <h2>{businessname}</h2>
      <p>{businessdate}</p>
      {businessimage && <img src={businessimage.fields.file.url} alt={businessname} title={businessname} />}
      <section dangerouslySetInnerHTML={{ __html: postDescription }} />
    </div>
  );
};

export default MerchantBlogPost;
