import React from 'react';
import { client } from '../../../blog';
import Posts from '../../atoms/blog/Posts';

export default class Blog extends React.Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    client
      .getEntries()
      .then((response) => {
        this.setState({
          articles: response.items,
        });
      })
      .catch(console.error);
  }
  render() {
    return (
      <>
        <h1>Blog</h1>
        <Posts posts={this.state.articles} />
      </>
    );
  }
}
