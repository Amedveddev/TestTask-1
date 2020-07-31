import React from 'react';
import './App.scss';

import Navigation from '../Components/Navigation';
import Users from '../Components/Users';

export default class extends React.PureComponent {
  state = {
    smallData: true,
    loading: null  
  };

  changeLoading = value =>{
    const loading = value;
    this.setState({
      loading
    });
  }

  changeDataType = () =>{
    const smallData = !this.state.smallData;
    this.setState({
      smallData
    });
  }

  render() {
    return (
      <>
        <Navigation
        loading={this.state.loading}
        changeDataType={this.changeDataType} 
        dataType={this.state.smallData} />
        <Users
        changeLoading={this.changeLoading}
        loading={this.state.loading} 
        dataType={this.state.smallData}/>
      </>
    );
  }
}