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
        <li class="relative flex justify-between items-center bg-gray-100 p-4 rounded">
            <span>${author.nome} ${author.cognome}</span>
            <div>
                <button class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none delete-author-btn" data-id="${author.id}">Elimina</button>
                <button class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none show-books-btn" data-id="${author.id}">Libri<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
            </button>
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