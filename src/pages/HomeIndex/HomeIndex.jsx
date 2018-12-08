import React, { Component } from 'react';
import IntroBanner from './components/IntroBanner';

export default class HomeIndex extends Component {
  static displayName = 'HomeIndex';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-index-page">
        <IntroBanner />
      </div>
    );
  }
}
