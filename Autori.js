class BookService {
    constructor() {
        this.basePath = "http://localhost:5123/api/Book";
        this.authorPath = "http://localhost:5123/api/Author";
    }

    async getBooksByAuthor(authorId) {
        try {
            const response = await fetch(`${this.basePath}/author/${authorId}`);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getAuthorById(authorId) {
        try {
            const response = await fetch(`${this.authorPath}/${authorId}`);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getAutori() {
        try {
            const response = await fetch(this.authorPath);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

class AuthorService {
    constructor() {
        this.authorPath = "http://localhost:5123/api/Author";
    }

    async getAutori() {
        try {
            const response = await fetch(this.authorPath);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async deleteAutori(id) {
        try {
            const response = await fetch(`${this.authorPath}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 204) {
                return true;
            } else if (response.ok) {
                const responseData = await response.json();
                return responseData;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante l\'eliminazione dell\'autore');
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

function addBookListeners(bookService) {
    const bookButtons = document.querySelectorAll('.show-books-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const authorId = button.dataset.id;
            const books = await bookService.getBooksByAuthor(authorId);
            const author = await bookService.getAuthorById(authorId);
            showBooks(books, author);
        });
    });
}

function showBooks(books, author) {
    console.log('Libri ricevuti:', books);
    console.log('Autore:', author);

    const booksList = document.getElementById('books-list');
    if (!booksList) {
        console.error('Elemento con ID "books-list" non trovato.');
        return;
    }

    if (!author) {
        console.error('Autore non trovato.');
        return;
    }

    booksList.innerHTML = `
        <h2 class="text-xl font-bold mb-4">Libri dell'autore: ${author.nome} ${author.cognome}</h2>
        <ul class="space-y-2">
            ${books.map(book => `
                <li class="flex justify-between items-center bg-gray-100 p-4 rounded">
                    <div>
                        <span class="font-bold">${book.titolo}</span>
                        <p>${book.descrizione}</p>
                        <p>Autore: ${author.nome} ${author.cognome}</p>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
}

async function loadAuthors() {
    const authorService = new AuthorService();
    const bookService = new BookService();
    const authors = await authorService.getAutori();
    const authorsList = document.getElementById('authors-list');

    if (!authorsList) {
        console.error('Elemento con ID "authors-list" non trovato.');
        return;
    }

    authorsList.innerHTML = authors.map(author => `
        <li class="flex justify-between items-center bg-gray-100 p-4 rounded">
            <span>${author.nome} ${author.cognome}</span>
            <div>
                <button class="bg-red-500 text-white px-4 py-2 rounded mr-2 delete-author-btn" data-id="${author.id}">Elimina</button>
                <button class="bg-green-500 text-white px-4 py-2 rounded show-books-btn" data-id="${author.id}">Libri</button>
            </div>
        </li>
    `).join('');

    addDeleteListeners(authorService);
    addBookListeners(bookService);
}

function addDeleteListeners(service) {
    const deleteButtons = document.querySelectorAll('.delete-author-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.dataset.id;
            const result = await service.deleteAutori(id);
            if (result) {
                alert('Autore eliminato con successo');
                loadAuthors();
            } else {
                alert('Errore durante l\'eliminazione dell\'autore');
            }
        });
    });
}

window.onload = loadAuthors;