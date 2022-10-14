import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/main/LandingPage';
import MainPage from './components/main/MainPage';

class App extends Component {

  state = {
    page: <></>
  }

  constructor(props) {
    super(props);
    this.state.page = <LandingPage onEnter={this.enterPortal} />;
  }


  enterPortal = () => {
    this.setState({ page: <MainPage /> })
  }


  render() {
    return <>
      {this.state.page}
    </>;
  }
}

export default App;
