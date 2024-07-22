class BookService {
    constructor() {
        this.basePath = "http://localhost:5123/api/Book";
        this.categoryPath = "http://localhost:5123/api/Category";
        this.authorPath = "http://localhost:5123/api/Author";
        this.publishingHousePath = "http://localhost:5123/api/PublishingH";
    }

    async postLibro(bookData) {
        const url = this.basePath;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });

            if (!response.ok) {
                throw new Error('Errore nella richiesta');
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

    const categories = await bookService.getCategories();
    const authors = await bookService.getAuthors();
    const publishingHouses = await bookService.getPublishingHouses();

    // Genera opzioni per le categorie
    let categoryOptions = '<option selected="">Seleziona categoria</option>';
    categories.forEach(category => {
        categoryOptions += `<option value="${category.id}">${category.nome}</option>`;
    });

    // Genera opzioni per gli autori
    let authorOptions = '<option selected="">Seleziona autore</option>';
    authors.forEach(author => {
        authorOptions += `<option value="${author.id}">${author.nome}</option>`;
    });

    // Genera opzioni per le case editrici
    let publishingHouseOptions = '<option selected="">Seleziona casa editrice</option>';
    publishingHouses.forEach(house => {
        publishingHouseOptions += `<option value="${house.id}">${house.nome}</option>`;
    });

    document.querySelector('.flex-1 .flex-col').innerHTML = `
        <div class="flex items-center justify-center min-h-screen mt-32">
            <section class="bg-slate-500">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-blue-950">Aggiungi un nuovo libro</h2>
                    <form id="bookForm">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="titolo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titolo</label>
                                <input type="text" name="titolo" id="titolo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci il titolo" required>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="anno" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Anno</label>
                                <input type="text" name="anno" id="anno" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci l'anno" required>
                            </div>
                            <div>
                                <label for="categoria" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleziona Categoria</label>
                                <select id="categoria" name="categoria" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    ${categoryOptions}
                                </select>
                            </div>
                            <div>
                                <label for="autore" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleziona Autore</label>
                                <select id="autore" name="autore" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    ${authorOptions}
                                </select>
                            </div>
                            <div>
                                <label for="casaEditrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleziona Casa Editrice</label>
                                <select id="casaEditrice" name="casaEditrice" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    ${publishingHouseOptions}
                                </select>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrizione</label>
                                <textarea id="description" name="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="La tua descrizione qui"></textarea>
                            </div>
                        </div>
                        <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Aggiungi Libro
                        </button>
                    </form>
                </div>
            </section>
        </div>`;

    document.getElementById('bookForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const titolo = document.getElementById('titolo').value;
        const anno = document.getElementById('anno').value;
        const categoryId = document.getElementById('categoria').value;
        const authorId = document.getElementById('autore').value;
        const publishingHId = document.getElementById('casaEditrice').value;
        const descrizione = document.getElementById('description').value;

        const bookData = { titolo, anno, descrizione, categoryId, authorId, publishingHId};

        const book = await bookService.postLibro(bookData);

        if (book) {
            alert('Libro creato con successo');
            window.location.href ="Libri.html";
        } else {
            alert('Errore nella creazione del libro');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSingleBook);