import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../../resources/icons/rose.svg';
import ListPage from '../pages/ListPage';
import DailyPage from '../pages/DailyPage';

export default class MainPage extends Component {

    state = {
        content: <></>
    }

    constructor(props) {
        super(props);
        this.state.content = <DailyPage />;
    }



    render() {
        return <>
            <div className='App-base'>
                <Navbar className='App-intro App-navbar mb-2' expand="lg" variant="dark" sticky="top" >
                    <Container fluid>
                        <Navbar.Brand className='navbar-title-intro bloom-text title' mx="auto" my="auto">
                            <img src={logo} width={48} height={48} alt="logo" className="inline-block align-top" />
                            <span >{' '}Blooms</span>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <Container fluid >
                    {this.state.content}
                </Container>
            </div>
        </>

    }

}