class AuthorService {
    constructor() {
        this.authorPath = "http://localhost:5123/api/Author";
    }

    async postAuthor(authorData) {
        const url = this.authorPath;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authorData)
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
}

async function loadSingleAuthor() {
    const authorService = new AuthorService();

    document.querySelector('.flex-1 .flex-col').innerHTML = `
        <div class="relative flex justify-between items-center bg-white p-4 rounded-xl mt-36 max-w-xl mx-auto shadow-lg">
            <section class="bg-white">
                <div class="py-8 px-4 m-12 mt-2 mb-2 lg:py-4">
                    <h2 class="mb-8 text-2xl font-bold text-center text-cyan-900">Aggiungi un nuovo Autore</h2>
                    <form id="authorForm">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2 -mx-12">
                                <label for="nome" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Nome</label>
                                <input type="text" name="nome" id="nome" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full   p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci il nome dell\'autore" required>
                            </div>
                            <div class="sm:col-span-2 -mx-12">
                                <label for="cognome" class="block mb-2  text-sm font-medium text-gray-900  dark:text-pink-500">Cognome</label>
                                <input type="text" name="congome" id="cognome" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full - p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci il cognome" required>
                            </div>
                            <div class="sm:col-span-2 -mx-12">
                                <label for="citta" class="block mb-2 text-sm font-medium text-gray-900  dark:text-pink-500">Citta</label>
                                <input type="text" name="citta" id="citta" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci la citta" required>
                            </div>
                            <div class="sm:col-span-2 -mx-12">
                                <label for="indirizzo" class="block mb-2 text-sm font-medium text-gray-900   dark:text-pink-500">Indirizzo</label>
                                <input type="text" name="indirizzo" id="indirizzo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci l\'indirizzo" required>
                            </div>
                            
                        </div>
                        <button type="submit" class="inline-flex -mx-12 items-center px-5 py-2.5 mt-4 sm:mt-6 text-xs text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 select-none gap-2 align-middle font-sans font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            Aggiungi Autore
                        </button>
                    </form>
                </div>
            </section>
        </div>`;

    document.getElementById('authorForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cognome = document.getElementById('cognome').value;
        const citta = document.getElementById('citta').value;
        const indirizzo = document.getElementById('indirizzo').value;

        const authorData = { nome, cognome, citta, indirizzo};

        const author = await authorService.postAuthor(authorData);

        if (author) {
            alert('Autore creato con successo');
            window.location.href ="Autori.html";
        } else {
            alert('Errore nella creazione dell\' autore');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSingleAuthor);