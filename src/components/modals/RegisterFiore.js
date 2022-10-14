import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';


export class FioreEditor extends Component {

    state = {
        show: true,
        edit: false,
        modal: <></>,
        Nome: '',
        Latino: '',
        ImageString: null,
        FioreDelGiorno: null,
        setFioreDelGiorno: false,
        query: []
    }


    constructor(props) {
        super(props);
        if (!!props.edit) {
            this.state.edit = props.edit;
        }
        if(!!props.create){
            this.state.create = props.create;
        }
    }

    componentDidMount() {
        if (!this.state.create) {
            requestFiore(
                (dt) => {
                    this.setState({
                        Nome: dt.query[0].Nome,
                        Latino: dt.query[0].Latino,
                        Nascita: new Date(dt.query[0].Nascita).toDateInputValue(),
                        Parentela: dt.query[0].IDParentela
                    })
                },
                this.errorLoadComp,
                { idfam: this.props.IDFAM, idcomp: this.props.ID }
            );
        }
    }


    handleNameChange = (e) => {
        e.preventDefault();
        this.setState({ Nome: e.target.value.toUpperCase() });
    }

    handleSurnameChange = (e) => {
        e.preventDefault();
        this.setState({ Cognome: e.target.value.toUpperCase() });
    }

    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({ Nascita: e.target.value });
    }

    handleParentelaChange = (e) => {
        e.preventDefault();
        this.setState({ Parentela: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.edit) {
            updateComp(
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(successicon, "Componenti", "Componente aggiornato con successo");
                    }
                    this.props.handleClose();
                },
                this.errorModifyComp,
                { idfam: this.props.IDFAM, idcomp: this.props.ID },
                {
                    Nome: this.state.Nome,
                    Cognome: this.state.Cognome,
                    Nascita: new Date(this.state.Nascita).getTime() / 1000,
                    Parentela: this.state.Parentela
                }
            );
        } else {
            createComp(
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(successicon, "Componenti", "Componente creato con successo");
                    }
                    this.props.handleClose();
                },
                this.errorCreateComp,
                this.props.IDFAM,
                {
                    Nome: this.state.Nome,
                    Cognome: this.state.Cognome,
                    Nascita: new Date(this.state.Nascita).getTime() / 1000,
                    Parentela: this.state.Parentela,
                }
            )
        }
    }

    errorLoadComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                modal: OkDialog("Errore caricamento dati", "Non è stato possibile scaricare i dati.", () => this.setState({ modal: <></> }), false)
            });
        } else {
            LoadApp.addMessage(erroricon, "Componenti", "Non è stato possibile scaricare i dati.");
        }
    }

    errorCreateComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                show: false,
                modal:
                    OkDialog("Errore creazione componente", "Non è stato possibile creare un nuovo componente.",
                        () => {
                            this.setState({
                                show: true,
                                modal: <></>
                            });
                            this.props.handleClose();
                        })
            });
        } else {
            LoadApp.addMessage(erroricon, "Componenti", "Non è stato possibile creare un nuovo componente.");
        }
    }

    errorModifyComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                show: false,
                modal: OkDialog("Errore modifica componente", "Non è stato possibile modificare il componente.",
                    () => {
                        this.setState({
                            show: true,
                            modal: <></>
                        });
                        this.props.handleClose();
                    })
            });
        } else {
            LoadApp.addMessage(erroricon, "Componenti", "Non è stato possibile modificare il componente.");
        }
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? "Modifica Componente" : "Crea Componente"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="lead">{this.state.edit ? "Cambia i dati del componente della famiglia:" : "Iscrivi un nuovo componente alla famiglia:"}</span>
                        <Form>
                            <Container fluid mx="auto">
                                <Row mx="auto" >
                                    <Col md>
                                        <Form.Group className="mb-3 mt-3" controlId="famdata">
                                            <Form.Text className="h6">Dati Componente:</Form.Text>
                                            <FloatingLabel controlId="floatingName" label="Nome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.Nome} onChange={this.handleNameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingSurname" label="Cognome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.Cognome} onChange={this.handleSurnameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingNascita" label="Data di nascita" className="mt-1">
                                                <Form.Control type="date" autoComplete="off" autoCorrect="off" value={this.state.Nascita} onChange={this.handleDateChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingParentela" label="Parentela" className="mt-1">
                                                <Form.Select aria-label="Grado di parentela" value={this.state.Parentela} onChange={this.handleParentelaChange}>
                                                    {this.state.query.map((row, index) => {
                                                        return <option key={index} value={row['ID']}>{row['Tipo']}</option>
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Chiudi
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            {this.state.edit ? "Applica" : "Salva"}
                        </Button>
                    </Modal.Footer>
                </Modal>
                ://Eseguito qua sotto se c'è un errore di ricezione dati dalla chiamata al codice php per i dati della famiglia
                <Container>
                    <span>Errore caricamento dati</span>
                </Container>
            }
            <>{this.state.modal}</>
        </>;
    }

}
