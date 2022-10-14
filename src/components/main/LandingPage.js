import React, { Component } from "react";
import logo from '../../resources/icons/rose.svg';
import { Container, Row } from 'react-bootstrap';

export default class LandingPage extends Component {

    state = {
        class_logo: "App-logo",
        class_app_intro: "App-intro",
        class_app_intro_delay: "App-intro-delayed"
    }


    render() {
        return <>
            <div className="App-base">
                <header className="App-header">
                    <img src={logo} className={this.state.class_logo} alt="logo" />
                    <Container fluid className={this.state.class_app_intro}>
                        <Row>
                            <code className="bloom-text header">Benvenutə</code>
                        </Row>
                        <Row>
                            <span className="bloom-text header-sub">
                                Conosci il mondo dei fiori
                            </span>
                        </Row>
                    </Container>
                    <Container id="enter_link" className={'my-4 ' + this.state.class_app_intro_delay} >
                        <a href='#esplora'
                            className="bloom-text header-link"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                this.setState({
                                    class_logo: "App-logo-outro",
                                    class_app_intro: "App-outro",
                                    class_app_intro_delay: "App-outro"
                                });
                                setTimeout(this.props.onEnter, 1000);
                            }}>
                            Esplora
                        </a>
                    </Container>
                </header>
                <footer className="App-footer">
                    <span onClick={this.props.handleLogin}>Login</span>
                </footer>
            </div>
        </>
    }
}