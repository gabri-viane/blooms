import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class DailyPage extends Component {

    state = {
        df: {},//Daily Flower
    }

    refresh() {
        //TODO: prendo valori da database
    }

    render() {
        return <>
            <Container fluid>
                <Row>
                    <span className='h1 bloom-text title'>Fiore del giorno</span>
                </Row>
                <Row>
                    <Col>
                        <span className='h2 bloom-text header'>
                            {("" + this.state.df.name).toUpperCase()}
                        </span>
                    </Col>
                    <Col>
                        <img alt="Fiore del giorno" tile="Fiore del giorno" src={this.state.df.image}></img>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.df.contents.map((textblock, index) => {
                            return <Col sm>
                                <Container>
                                    <span className='h4 lead bloom-text header-sub'>{textblock.title}</span>
                                    <span className='mt-2'>{textblock.text}</span>
                                </Container>
                            </Col>
                        })
                    }
                </Row>
            </Container>
        </>
    }


}