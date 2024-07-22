class BookService {
    basePath = "http://localhost:5123/api/Book";
    categoryPath = "http://localhost:5123/api/Category";
    AuthorPath = "http://localhost:5123/api/Author";
  
  
    async getLibro() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlParams.get('id'), 10);
        try {
            if (typeof id !== "number") {
                throw new Error('Id non valido');
            }
            const response = await fetch(`${this.basePath}/${id}`);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return null;
        }
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
    async getAutore() {
        try {
            const response = await fetch(this.AuthorPath);
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return await response.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
    
    async deleteLibro(id) {
      try {
          const response = await fetch(`${this.basePath}/${id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
  
          if (response.ok) {
              const responseData = await response.json(); // Legge la risposta come JSON
              return responseData; // Restituisce i dati della risposta JSON
          } else {
              // Gestisce la risposta di errore
              const errorData = await response.json();
              throw new Error(errorData.message || 'Errore durante l\'eliminazione del libro');
          }
      } catch (e) {
          console.error(e);
          return null;
      }
    }
  }
  
  async function loadBookDetails() {
    const bookService = new BookService();
    const [book, categories, autore] = await Promise.all([
        bookService.getLibro(),
        bookService.getCategorie(),
        bookService.getAutore()
    ]);
  
    if (book) {
        const categoryMap = categories.reduce((map, category) => {
            map[category.id] = category.nome;
            return map;
        }, {});
  
        document.getElementById('book-detail').innerHTML = `
            <div class="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div class="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                    <img
                        src="https://knigagolik.it/wp-content/uploads/2021/04/libro-in-russo-harry-potter-e-la-pietra-filosofale-cover.jpg"
                        alt="image"
                        class="h-full w-full object-cover"
                    />
                </div>
                <div class="p-6">
                    <h6 class="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                        ${categoryMap[book.categoryId] || 'Categoria sconosciuta'}
                    </h6>
                    <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        ${book.titolo}
                    </h4>
                    <p class="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                        ${book.descrizione}
                    </p>
                    <a class="inline-block" href="ModificaLibro.html?id=${book.id}">
                        <button
                              id="modify-button"    
                            class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            Modifica
                        </button>
                    </a>
                    <a class="inline-block" href="#">
                        <button
                            id="delete-button"
                            class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            Elimina
                        </button>
                    </a>
                </div>
            </div>
        `;
  
        document.getElementById('delete-button').addEventListener('click', async () => {
            const confirmed = confirm('Sei sicuro di voler eliminare questo libro?');
            if (confirmed) {
                const result = await bookService.deleteLibro(book.id);
                if (result) {
                    alert(result.message || 'Libro eliminato con successo');
                    window.location.href = 'Libri.html'; 
                } else {
                    alert('Errore durante l\'eliminazione del libro');
                }
            }
        });
    } else {
        document.getElementById('book-detail').innerText = 'Dettagli del libro non trovati';
    }
  }
  
  window.onload = loadBookDetails;