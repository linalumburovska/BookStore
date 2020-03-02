import React, { Component } from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {API_CALL} from "../allBooks/AllBooks";

/* Modal component for deleting some book */
class DeleteBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: props.id
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitDeleteBook = this.submitDeleteBook.bind(this);
    }

    handleShow () {
        this.setState({
            show: true
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    submitDeleteBook(e) {
        e.preventDefault();
        const { id } = this.state;
        /* DELETE call for editing some book by id */
        fetch(API_CALL + '/api/books/'+ id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => {
                console.log(data);
            });
        this.handleClose();
        this.props.deleteModalData(id);

    }

    render() {
        return(
            <div>
                <Button variant="info" onClick = {this.handleShow}>
                    Delete
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete this book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitDeleteBook}>
                            <p className="text-center">Are you sure you want to delete this book? </p>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="info" type="submit" className="float-right">
                                Yes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default DeleteBook;