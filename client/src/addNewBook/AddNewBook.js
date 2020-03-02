import React, {Component} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { API_CALL } from '../allBooks/AllBooks';

/* Modal component for adding a new book */
class AddNewBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: '',
            name: '',
            author: '',
            year: '',
            tags: [],
            allTags: []
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitNewBook = this.submitNewBook.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handleTags = this.handleTags.bind(this);
    }

    componentDidMount() {
        /* GET all tags as options */
        fetch(API_CALL + '/api/tags')
            .then(response => response.json())
            .then(data => {
                this.setState({ allTags: data })
            });
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

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleAuthor(e) {
        this.setState({
            author: e.target.value
        })
    }

    handleYear(e) {
        this.setState({
            year: e.target.value
        })
    }

    handleTags(e) {
        let tags = e.target.options;
        let values = [];
        for (let i = 0, l = e.target.length; i < l; i++) {
            if (tags[i].selected) {
                values.push(tags[i].value);
            }
        }
        this.setState({
            tags: values
        })
    }

    submitNewBook(e) {
        e.preventDefault();
        const { name, author, year, tags } = this.state;
        /* POST call for adding a new book */
        fetch(API_CALL + '/api/books', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                author: author,
                year: year,
                tags: tags
            })
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    id: data.id
                })
                const { id } = this.state;
                this.props.addModalData(id,name,author,year,tags);
            });
        this.handleClose();

    }

    render() {
        let { allTags } = this.state;
        allTags = Object.keys(allTags);

        return(
            <div>
                <Button variant="info" onClick = {this.handleShow}>
                    Add new book
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitNewBook}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleName} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" placeholder="Enter author" value={this.state.author} onChange={this.handleAuthor} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Year</Form.Label>
                                <Form.Control type="text" placeholder="Enter year" value={this.state.year} onChange={this.handleYear} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Tags</Form.Label>
                                <Form.Control as="select" value={this.state.tags} onChange={this.handleTags} multiple>
                                    {allTags.map( tag =>
                                        <option key={tag}>{tag}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>

                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="info" type="submit" className="float-right">
                                Save
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default AddNewBook;