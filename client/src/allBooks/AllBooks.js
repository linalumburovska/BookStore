import React, { Component } from 'react';
import {Button, Table, InputGroup, Form} from 'react-bootstrap';
import { Route } from "react-router-dom";

import './AllBooks.css';

import Login, { EMAIL } from "../login/Login";
import AddNewBook from "../addNewBook/AddNewBook";
import DeleteBook from "../deleteBook/DeleteBook";
import EditBook from "../editBook/EditBook";

/* Constant for BE call */
export const API_CALL = 'http://localhost:4000';

/* AllBooks component where all books are shown in a table, logout button, add new book button and search bar as a filter */
class AllBooks extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: EMAIL,
            books: [],
            search: '',
            isLoggedIn: localStorage.getItem('loggedIn')
        };

        this.onClickLogout = this.onClickLogout.bind(this);
        this.addModalData = this.addModalData.bind(this);
        this.deleteModalData = this.deleteModalData.bind(this);
        this.editModalData = this.editModalData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        /* GET all books call */
        fetch(API_CALL + '/api/books')
            .then(response => response.json())
            .then(data => {
                this.setState({ books: data })
            });
    }

    onClickLogout(e) {
        /* Logout user event, route to login page */
        e.preventDefault();
        this.props.history.push('/');
        localStorage.setItem('loggedIn', false);
        return <Route to="/" component={Login} />
    }

    addModalData(id,name,author,year,tags) {
        /* Refresh state when adding a new book */
        let newBook = {
            id: id,
            name: name,
            author: author,
            year: year,
            tags: tags
        }

        this.setState({
            books: [...this.state.books, newBook]
        })
    }

    deleteModalData(id) {
        /* Refresh state when deleting some book */
        let newBooks = [];

        for(let i=0; i < this.state.books.length; i++) {
            if(this.state.books[i].id!==id) {
                newBooks.push(this.state.books[i]);
            }
        }
        this.setState({
            books: newBooks
        })
    }

    editModalData(id,name,author, year, tags) {
        /* Refresh state when editing some book */
        let changedData = {
            id: id,
            name: name,
            author: author,
            year: year,
            tags: tags
        }

        let newBooks = [...this.state.books];
        for(let i=0; i < newBooks.length; i++) {
            if(newBooks[i].id===id) {
                newBooks[i] = changedData;
            }
        }

        this.setState({
            books: newBooks
        })
    }

    handleSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    render() {
        const { books } = this.state;
        /* Filter books by name, author, year and tags using the search bar */
        let filteredBooks = books.filter(
            (book) => {
                return (
                    book.name.indexOf(this.state.search) !== -1 ||
                    book.author.indexOf(this.state.search) !== -1 ||
                    book.year.indexOf(this.state.search) !== -1 ||
                    book.tags.indexOf(this.state.search) !== -1
                )
            }
        );

        return (
            <div>
                <div className="row m-4">
                    <div className="col">
                        <AddNewBook addModalData = {this.addModalData} />
                    </div>
                    <div className="col">
                        <h3 className="d-inline">{this.state.email}</h3>
                    </div>
                    <div className="col">
                        <InputGroup className="mb-3">
                            <Form.Control type="text" placeholder="Search" value={this.state.search} onChange={this.handleSearch} />
                        </InputGroup>
                    </div>
                    <div className="col text-center">
                        <Button variant="info" onClick={this.onClickLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Tags</th>
                            <th colSpan="2" className="pl-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map(book =>
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.tags.join(',')}</td>
                                <td>
                                    <EditBook id={book.id}
                                              name={book.name}
                                              author={book.author}
                                              year={book.year}
                                              tags={book.tags}
                                              editModalData = {this.editModalData}
                                    />
                                </td>
                                <td>
                                    <DeleteBook id={book.id} deleteModalData = {this.deleteModalData} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AllBooks;