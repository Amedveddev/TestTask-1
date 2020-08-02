import React from 'react';
import './App.scss';

import {CSSTransition} from 'react-transition-group';

import Navigation from '../Components/Navigation';
import Users from '../Components/Users';
import Form from '../Components/Form';

export default class extends React.PureComponent {
  state = {
    smallData: true,
    loading: null,
    showForm: false,
    newUser: null,
    search: ''
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

  showForm = () =>{
    this.setState({
      showForm: true
    });
  }

  hideForm = () =>{
    this.setState({
      showForm: false
    });
  }

  addUser = e =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const arr = [];
    formData.forEach(el=>{
      arr.push(el);
    });

    const data = {
      id: arr[0],
      firstName: arr[1],
      lastName: arr[2],
      email: arr[3],
      phone: arr[4],
      address: {
        streetAddress: '9792 Mattis Ct',
        city: 'Waukesha',
        state: 'WI',
        zip: '22178'
      },
      description: 'et lacus magna dolor...',
    };

    this.setState({
      newUser: data
    });
  }

  closeForm = e =>{
    if(e.target.classList.contains('form') 
    || e.target.classList.contains('container') 
    || e.target.classList.contains('close') ) {
        this.hideForm();
    }
  }

  search = e =>{
    this.setState({
      search: e.target.value
    });
  }

  render() {
    return (
      <>
        <CSSTransition
          in={this.state.showForm}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <Form 
          addUser={this.addUser}
          closeForm={this.closeForm}
          showForm={this.state.showForm}/>
        </CSSTransition>
        <Navigation
        searchText={this.state.search}
        search={this.search}
        addUser={this.showForm}
        loading={this.state.loading}
        changeDataType={this.changeDataType} 
        dataType={this.state.smallData} />
        <Users
        searchText={this.state.search}
        hideForm={this.hideForm}
        newUser={this.state.newUser}
        changeLoading={this.changeLoading}
        loading={this.state.loading} 
        dataType={this.state.smallData}/>
      </>
    );
  }
}