class CategoryService {
    constructor() {
        this.categoryPath = "http://localhost:5123/api/Category";
    }

    async postCategoria(CatData) {
        const url = this.categoryPath; // Correggi l'URL qui
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(CatData)
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

async function loadSingleCategory() {
    const catService = new CategoryService();

    document.querySelector('.flex-1 .flex-col').innerHTML = `
        <div class="relative flex justify-between items-center bg-white p-4 rounded-xl mt-36 max-w-4xl mx-auto shadow-lg">
            <section class="bg-white">
                <div class="py-10 px-4 m-8 max-w-4xl lg:py-4  mt-2 mb-2">
                    <h2 class="mb-8 text-2xl font-bold text-center text-cyan-900">Aggiungi una nuova Categoria</h2>
                    <form id="CatForm">
                        <div class="grid gap-6 sm:grid-cols-2 sm:gap-6 -mx-8">
                            <div class="sm:col-span-2">
                                <label for="nomecat" class="block mb-2 text-sm font-medium text-gray-900 dark:text-pink-500">Nome Categoria</label>
                                <input type="text" name="nomecat" id="nome" class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400 dark:text-cyan-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci nome della categoria" required>
                            </div>
                        </div>
                        <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-xs text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 select-none gap-2 align-middle font-sans font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            Aggiungi Categoria
                        </button>
                    </form>
                </div>
            </section>
        </div>`;

    document.getElementById('CatForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nomeCat = document.getElementById('nome').value;
        const CatData = { nome: nomeCat }; // Prepara i dati della categoria

        const catUp = await catService.postCategoria(CatData); // Usa l'istanza catService

        if (catUp) {
            alert('Categoria creata con successo');
            window.location.href = "MenuCategorie.html";
        } else {
            alert('Errore nella creazione della categoria');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSingleCategory);