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
        <div class="flex items-center justify-center min-h-screen mt-32">
            <section class="bg-slate-500">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-blue-950">Aggiungi un nuovo libro</h2>
                    <form id="CatForm">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="nomecat" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Categoria</label>
                                <input type="text" name="nomecat" id="nome" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Inserisci nome della categoria" required>
                            </div>
                        </div>
                        <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
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