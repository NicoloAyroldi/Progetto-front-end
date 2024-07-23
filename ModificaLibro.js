class BookService {
    constructor() {
        this.basePath = "http://localhost:5123/api/Book";
        this.categoryPath = "http://localhost:5123/api/Category";
        this.authorPath = "http://localhost:5123/api/Author";
        this.publishingHousePath = "http://localhost:5123/api/PublishingH";
    }

    async updateLibro(bookData) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'), 10);
        const url = `${this.basePath}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });

            if (!response.ok) {
                throw new Error('Errore nella richiesta di aggiornamento');
            }
            return await response.json();

        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getBookById(id) {
        try {
            const response = await fetch(`${this.basePath}/${id}`);
            if (!response.ok) {
                throw new Error('Errore nella richiesta del libro');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getCategories() {
        try {
            const response = await fetch(this.categoryPath);
            if (!response.ok) {
                throw new Error('Errore nella richiesta delle categorie');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getAuthors() {
        try {
            const response = await fetch(this.authorPath);
            if (!response.ok) {
                throw new Error('Errore nella richiesta degli autori');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getPublishingHouses() {
        try {
            const response = await fetch(this.publishingHousePath);
            if (!response.ok) {
                throw new Error('Errore nella richiesta delle case editrici');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}


async function loadSingleBook() {
    const bookService = new BookService();
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    // Fetch data
    const categories = await bookService.getCategories();
    const authors = await bookService.getAuthors();
    const publishingHouses = await bookService.getPublishingHouses();

    let bookData = null;
    if (bookId) {
        bookData = await bookService.getBookById(bookId);
        console.log('Book Data:', bookData);
    }

    // Generate options
    let categoryOptions = '<option selected="">Seleziona categoria</option>';
    categories.forEach(category => {
        categoryOptions += `<option value="${category.id}" ${bookData && bookData.categoryId === category.id ? 'selected' : ''}>${category.nome}</option>`;
    });

    let authorOptions = '<option selected="">Seleziona autore</option>';
    authors.forEach(author => {
        authorOptions += `<option value="${author.id}" ${bookData && bookData.authorId === author.id ? 'selected' : ''}>${author.nome}</option>`;
    });

    let publishingHouseOptions = '<option selected="">Seleziona casa editrice</option>';
    publishingHouses.forEach(house => {
        publishingHouseOptions += `<option value="${house.id}" ${bookData && bookData.publishingHId === house.id ? 'selected' : ''}>${house.nome}</option>`;
    });

    // Generate form
    document.querySelector('.flex-1 .flex-col').innerHTML = `
        <div class="relative flex justify-between items-center bg-white p-4 rounded-xl mt-36 max-w-xl mx-auto shadow-lg">
            <section class="bg-white">
                <div class="py-8 px-4 mx-auto lg:py-4">
                    <h2 class="mb-8 text-2xl font-bold text-center text-cyan-900">Modifica Libro</h2>
                    <form id="bookForm">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="titolo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Titolo</label>
                                <input type="text" name="titolo" id="titolo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci il titolo" value="${bookData ? bookData.titolo : ''}" required>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="anno" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Anno</label>
                                <input type="text" name="anno" id="anno" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci l'anno" value="${bookData ? bookData.anno : ''}" required>
                            </div>
                            <div>
                                <label for="categoria" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Seleziona Categoria</label>
                                <select id="categoria" name="categoria" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    ${categoryOptions}
                                </select>
                            </div>
                            <div>
                                <label for="autore" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Seleziona Autore</label>
                                <select id="autore" name="autore" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    ${authorOptions}
                                </select>
                            </div>
                            <div>
                                <label for="casaEditrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Seleziona Casa Editrice</label>
                                <select id="casaEditrice" name="casaEditrice" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    ${publishingHouseOptions}
                                </select>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Descrizione</label>
                                <textarea id="description" name="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="La tua descrizione qui">${bookData ? bookData.descrizione : ''}</textarea>
                            </div>
                        </div>
                        <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-xs text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 select-none gap-2 align-middle font-sans font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            Modifica Libro
                        </button>
                    </form>
                </div>
            </section>
        </div>`;

    document.getElementById('bookForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const id=bookId;
        const titolo = document.getElementById('titolo').value;
        const anno = document.getElementById('anno').value;
        const categoryId = document.getElementById('categoria').value;
        const authorId = document.getElementById('autore').value;
        const publishingHId = document.getElementById('casaEditrice').value;
        const descrizione = document.getElementById('description').value;

        const bookData = { id, titolo, anno, descrizione, categoryId, authorId, publishingHId};
        const updatedBook = await bookService.updateLibro(bookData);
        console.log(bookData)

        if (updatedBook) {
           
            if (updatedBook) {
                alert('Libro aggiornato con successo');
                window.location.href = "Libri.html";
            } else {
                alert('Errore nell\'aggiornamento del libro');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSingleBook);