import React from 'react';
import './App.scss';

import Navigation from '../Components/Navigation';

export default class extends React.Component {
  state = {
    smallData: true,
    loading: false  
  };

  render() {
    return (
      <>
      <Navigation />

      </>
    );
  }
}