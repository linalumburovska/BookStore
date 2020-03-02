const nanoid = require('nanoid');
const initData = require('./data').initData;

const books = require('./data').books;
const tags = require('./data').tags;

const validateBook = (book) => {
    let error = '';
    if (!book) {
        error = 'Missing book'
    } else if (!book.name) {
        error = 'Missing book name'
    } else if (!book.author) {
        error = 'Missing book author'
    } else if (!book.year) {
        error = 'Missing book year'
    }
    return error;
}

const initRoutes = (app) => {
    initData();
    // Books
    app.get('/api/books', async (req, res) => {
        res.json(books);
    });
    app.post('/api/books', async (req, res) => {
        const book = req.body;
        const error = validateBook(book);
        if (!!error) {
            res.status(409).json({ error });
        } else {
            const hasTags = !!book.tags && Array.isArray(book.tags);
            const id = nanoid();
            books.push({
                id,
                name: book.name,
                author: book.author,
                year: book.year,
                tags: hasTags ? [...book.tags] : []
            });
            if (hasTags) {
                book.tags.forEach(tag => {
                    if (tags[tag]) {
                        tags[tag] = [
                            ...tags[tag],
                            id
                        ]
                    } else {
                        tags[tag] = [id]
                    }
                });
            }
            res.json({ "status": "success", id });
        }
    });
    app.put('/api/books/:id', async (req, res) => {
        if (!req.params.id) {
            res.status(409).json({ "error": "id parameter is missing" });
        } else {
            const dbBook = books.find(b => b.id == req.params.id);
            const book = req.body;
            if (!!book && !!dbBook) {
                const hasTags = !!book.tags && Array.isArray(book.tags);
                const id = dbBook.id;
                dbBook.name = book.name;
                dbBook.author = book.author;
                dbBook.year = book.year;
                dbBook.tags = hasTags ? [...book.tags] : []

                if (hasTags) {
                    Object.keys(tags).forEach(tag => {
                        const tagsValues = tags[tag];
                        const tagIndex = tagsValues.findIndex(t => t == id);
                        if (tagIndex > -1) {
                            tagsValues.splice(tagIndex, 1);
                        }
                    });
                    book.tags.forEach(tag => {
                        if (tags[tag]) {
                            tags[tag] = [
                                ...tags[tag],
                                id
                            ]
                        } else {
                            tags[tag] = [id]
                        }
                    });
                }
                res.json({ "status": "success" });
            } else {
                res.status(409).json({ "error": "No matching book found" });
            }
        }
    });
    app.delete('/api/books/:id', async (req, res) => {
        if (!req.params.id) {
            res.status(409).json({ "error": "id parameter is missing" });
        } else {
            const index = books.findIndex(b => b.id == req.params.id);
            const book = books[index];
            if (index > -1) {
                book.tags.forEach(tag => {
                    const tagsValues = tags[tag];
                    const tagIndex = tagsValues.findIndex(t => t == book.id);
                    if (tagIndex > -1) {
                        tagsValues.splice(tagIndex, 1);
                    }
                });
                books.splice(index, 1);
                res.json({ "status": "success" });
            } else {
                res.status(409).json({ "error": "No matching book found" });
            }
        }
    });

    // tags 
    app.get('/api/tags', async (req, res) => {
        res.json(tags);
    });
};

module.exports = {
    initRoutes
}
