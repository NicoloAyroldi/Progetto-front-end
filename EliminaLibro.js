class BookService {
    constructor() {
        this.basePath = "http://localhost:5123/api/Book";
    }

    async deleteLibro(bookId) {
        const url = `${this.basePath}/${bookId}`;
        console.log('Inizio deleteLibro');  // Log aggiuntivo
        try {
            // Log dell'ID inviato
            console.log('ID inviato:', bookId);

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Log della risposta grezza
            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Errore nella richiesta: ${response.status} - ${errorData.message || 'Errore sconosciuto'}`);
            }

            console.log('Libro eliminato con successo');
            return true;
        } catch (e) {
            console.error('Errore durante la richiesta:', e);
            return false;
        }
    }
}

async function deleteBook(bookId) {
    const bookService = new BookService();
    if (confirm('Sei sicuro di voler eliminare questo libro?')) {
        const result = await bookService.deleteLibro(bookId);
        if (result) {
            alert('Libro eliminato con successo!');
            // Rimuovi l'elemento del libro dal DOM o aggiorna la lista dei libri
            document.querySelector(`button[onclick="deleteBook(${bookId})"]`).closest('.relative.flex').remove();
        } else {
            alert('Errore durante l\'eliminazione del libro.');
        }
    }
}