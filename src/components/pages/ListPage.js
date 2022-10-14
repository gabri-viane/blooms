import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
//import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Azalea from '../../resources/eg/Azalea.jpg';
import Galliardia from '../../resources/eg/Galliardia.jpg';
import jsondata from '../../resources/strings/listpage.json';

export default class ListPage extends Component {

    state = {
        components: [],
        jsond: {}
    };

    constructor(props) {
        super(props);
        this.state.jsond = jsondata;
        this.state.components =
            [
                { name: 'Azalea 1', image: Azalea },
                { name: 'Galliardia 2', image: Galliardia },
                { name: 'Azalea 3', image: Azalea },
                { name: 'Galliardia 4', image: Galliardia },
                { name: 'Azalea 5', image: Azalea },
                { name: 'Galliardia 6', image: Galliardia },
                { name: 'Azalea 7', image: Azalea },
                { name: 'Galliardia 8', image: Galliardia },
                { name: 'Azalea 9', image: Azalea },
                { name: 'Galliardia 10', image: Galliardia },
                { name: 'Azalea 11', image: Azalea },
                { name: 'Galliardia 12', image: Galliardia },
                { name: 'Azalea 13', image: Azalea },
                { name: 'Galliardia 14', image: Galliardia },
            ]
    }

    transformToRow(data) {
        return <Row className='text-align-center justify-content d-flex'>
            {
                data.map((val, index) => {
                    return <Col sm className='mt-2' key={index}>
                        <Card key={index} className='card-intro'>
                            <Card.Img variant="top" src={val.image} />
                            <Card.Body>
                                {/* <Card.Title >{val.name}</Card.Title> */}
                                <Button className='bloom-button soft'><span className='bloom-text header'>{val.name}</span></Button>
                            </Card.Body>
                        </Card>
                    </Col>;
                })
            }
        </Row>
    }

    transformToColumn(data) {
        const cols = 5;
        const cls = [];
        for (let i = 0; i < cols; i++) {
            const rows = Math.ceil(data.length / cols);
            const r = data.slice(i * rows, i * rows + rows);
            cls[i] = <>
                {
                    r.map((val, index) => {
                        return <Card key={index} className='card-intro mt-2'>
                            <Card.Img variant="top" src={val.image} />
                            <Card.Body>
                                {/* <Card.Title >{val.name}</Card.Title> */}
                                <Button className='bloom-button soft'><span className='bloom-text button-link'>{val.name}</span></Button>
                            </Card.Body>
                        </Card>
                    })
                }</>
        }
        return <Row>{cls.map((val, index) => {
            return <Col sm key={index}>{val}</Col>;
        })}</Row>
    }

    getRandomString() {
        const lr = this.state.jsond.buttons;
        console.log(lr);
        return lr[Math.floor(Math.random() * lr.length)];
    }

    render() {
        return <>
            <Container fluid>
                {this.transformToColumn(this.state.components)}
            </Container>
        </>
    }

}