const nanoid = require('nanoid');

const books = [
    {
        id: "",
        name: 'The Shining',
        author: "Stephen King",
        year: '1977',
        tags: ['horror']
    },
    {
        id: "",
        name: 'The Outsider',
        author: "Stephen King",
        year: '2018',
        tags: ['horror']
    },
    {
        id: "",
        name: 'Harry Potter and the Philosopher\'s Stone',
        author: "J. K. Rowling",
        year: '1997',
        tags: ['fantasy', 'fiction', 'magic']
    },
    {
        id: "",
        name: 'Harry Potter and the Goblet of Fire',
        author: "J. K. Rowling",
        year: '2000',
        tags: ['fantasy', 'fiction', 'magic']
    },
    {
        id: "",
        name: 'Murder on the Orient Express',
        author: "Agatha Christie",
        year: '1934',
        tags: ['mistery', 'detective', 'investigation']
    },
    {
        id: "",
        name: 'A Caribbean Mystery',
        author: "Agatha Christie",
        year: '1964',
        tags: ['mistery', 'detective', 'investigation']
    },
    {
        id: "",
        name: 'A Song of Ice and Fire',
        author: "George R. R. Martin",
        year: '2018',
        tags: ['battle', 'fantasy', 'magic']
    },
    {
        id: "",
        name: 'A Storm of Swords',
        author: "George R. R. Martin",
        year: '2000',
        tags: ['battle', 'fantasy', 'magic']
    }
];

const tags = {};

const initData = () => {
    books.forEach(book => {
        book.id = nanoid();
        book.tags.forEach(tag => {
            if (tags.hasOwnProperty(tag)) {
                tags[tag] = [...tags[tag], book.id];
            } else {
                tags[tag] = [book.id];
            }
        })
    });
}

module.exports = {
    books, tags, initData
}