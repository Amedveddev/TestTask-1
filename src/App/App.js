import React from 'react';
import './App.scss';

import Navigation from '../Components/Navigation';
import Users from '../Components/Users';

export default class extends React.Component {
  state = {
    smallData: true,
    loading: true  
  };

  changeLoading = () =>{
    const loading = !this.state.loading;
    this.setState({
      loading
    });
  }

  render() {
    return (
      <>
        <Navigation dataType={this.state.smallData} />
        <Users
        changeLoading={this.changeLoading}
        loading={this.state.loading} 
        dataType={this.state.smallData}/>
      </>
    );
  }
}