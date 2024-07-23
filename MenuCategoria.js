class BookService {
    constructor() {
        this.basePath = "http://localhost:5123/api/Book";
        this.categoryPath = "http://localhost:5123/api/Category";
        this.authorPath = "http://localhost:5123/api/Author";
    }

    async getBooksByCategory(categoryId) {
        try {
            const response = await fetch(`${this.basePath}/category/${categoryId}`);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getCategoriaById(categoryId) {
        try {
            const response = await fetch(`${this.categoryPath}/${categoryId}`);
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

class CategoryService {
    constructor() {
        this.categoryPath = "http://localhost:5123/api/Category";
    }

    async getCategorie() {
        try {
            const response = await fetch(this.categoryPath);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async deleteCategoria(id) {
        try {
            const response = await fetch(`${this.categoryPath}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 204) {
                return true; // 204 No Content indica successo senza contenuto
            } else if (response.ok) {
                const responseData = await response.json();
                return responseData;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante l\'eliminazione della categoria');
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

// Funzione per aggiungere i listener ai pulsanti "Libri"
function addBookListeners(bookService) {
    const bookButtons = document.querySelectorAll('.show-books-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const categoryId = button.dataset.id;
            const [books, category, authors] = await Promise.all([
                bookService.getBooksByCategory(categoryId),
                bookService.getCategoriaById(categoryId),
                bookService.getAutori()
            ]);
            showBooks(books, category, authors);
        });
    });
}

// Funzione per mostrare i libri di una categoria
function showBooks(books, category, authors) {
    console.log('Libri ricevuti:', books); // Aggiungi questo log
    console.log('Categoria:', category); // Aggiungi questo log
    console.log('Autori:', authors); // Aggiungi questo log

    const booksList = document.getElementById('books-list');
    if (!booksList) {
        console.error('Elemento con ID "books-list" non trovato.');
        return;
    }

    if (!category) {
        console.error('Categoria non trovata.');
        return;
    }

    const authorMap = authors.reduce((map, author) => {
        map[author.id] = `${author.nome} ${author.cognome}`;
        return map;
    }, {});

    booksList.innerHTML = `
        <h2>Libri della categoria: ${category.nome}</h2>
        <ul>
            ${books.map(book => {
                const authorName = authorMap[book.authorId] || 'Autore non disponibile';

                return `
                    <li class="flex justify-between items-center bg-gray-100 p-4 rounded mb-4">
                        <div>
                            <span class="font-bold">${book.titolo}</span>
                            <p>${book.descrizione}</p>
                            <p>Autore: ${authorName}</p>
                        </div>
                    </li>
                `;
            }).join('')}
        </ul>
    `;
}

// Funzione per caricare le categorie
async function loadCategories() {
    const categoryService = new CategoryService();
    const bookService = new BookService();
    const categories = await categoryService.getCategorie();
    const categoriesList = document.querySelector('ul.space-y-4');

    if (!categoriesList) {
        console.error('Elemento con classe "space-y-4" non trovato.');
        return;
    }

    categoriesList.innerHTML = categories.map(category => `
        <li class="relative flex justify-between items-center bg-gray-100 p-4 rounded">
            <span>${category.nome}</span>
            <div>
                <button class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none delete-category-btn" data-id="${category.id}">Elimina</button>
                <button class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none show-books-btn" data-id="${category.id}">Libri
                <svg
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

    addDeleteListeners(categoryService);
    addBookListeners(bookService);
}

// Funzione per aggiungere i listener ai pulsanti "Elimina"
function addDeleteListeners(service) {
    const deleteButtons = document.querySelectorAll('.delete-category-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.dataset.id;
            const result = await service.deleteCategoria(id);
            if (result) {
                alert('Categoria eliminata con successo');
                // Ricarica le categorie dopo l'eliminazione
                loadCategories();
            } else {
                alert('Errore durante l\'eliminazione della categoria');
            }
        });
    });
}

window.onload = loadCategories;
