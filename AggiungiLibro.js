
class BookService {
    constructor() {
        this.basePath = "http://localhost:5123/api/Book";
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
}

document.getElementById('bookForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const titolo = document.getElementById('titolo').value;
    const anno = parseInt(document.getElementById('anno').value, 10);
    const categoria = document.getElementById('categoria').value;
    const autore = document.getElementById('autore').value;

    const bookData = { titolo, anno, categoria, autore };

    const bookService = new BookService();
    const book = await bookService.postLibro(bookData);

    if (book) {
        console.log('Libro creato con successo:', book);
    } else {
        console.log('Errore nella creazione del libro');
    }
});

/*async function createBook() {
    const bookService = new BookService();
    const bookData = {
        titolo: "Esempio di Titolo",
        anno: 2021,
        categoria: "Fiction",
        autore: "Autore 1"
    };

    const book = await bookService.postLibro(bookData);
    if (book) {
        console.log('Libro creato con successo:', book);
    } else {
        console.log('Errore nella creazione del libro');
    }
}

createBook();

form.innerHTML =  
`<div id="formContainer" class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-32">
        <h1 class="text-2xl font-bold mb-6">Nuovo Libro</h1>
        <form id="bookForm">
            <div class="mb-4">
                <label for="titolo" class="block text-gray-700 font-semibold mb-2">Titolo:</label>
                <input type="text" id="titolo" name="titolo" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="mb-4">
                <label for="anno" class="block text-gray-700 font-semibold mb-2">Anno:</label>
                <input type="number" id="anno" name="anno" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="mb-4">
                <label for="categoria" class="block text-gray-700 font-semibold mb-2"> Categoria:</label>
                <input type="number" id="categoria" name="categoria" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="mb-6">
 <label for="categoria" class="block text-gray-700 font-semibold mb-2"> Autore:</label>
                <input type="number" id="autore" name="Autore" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex justify-end space-x-4">
                <button type="reset" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">Reset</button>
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Crea</button>
            </div>
        </form>
    </div>`
*/
    
