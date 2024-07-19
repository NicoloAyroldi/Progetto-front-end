class BookService {
    basePath = "http://localhost:5123/api/Book";
    categoryPath = "http://localhost:5123/api/Category"; // Assumendo che l'API delle categorie sia qui
  
    async getLibri() { 
        try {
            const response = await fetch(this.basePath);
  
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            } 
            return await response.json();
            
        } catch (e) {
            return [];
        }
    }

    async getLibro(id) {
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
            return [];
        }
    }
  }
  
  
  async function loadAllBooks() {
    const bookService = new BookService();
    const [books, categories] = await Promise.all([
        bookService.getLibri(),
        bookService.getCategorie()
    ]);
  
    const categoryMap = categories.reduce((map, category) => {
        map[category.id] = category.nome; // Assumendo che il nome del campo sia 'name'
        return map;
    }, {});
  
    books.forEach(book => loadSingleBook(book, categoryMap));
  }
  
  
  
  
  /*card.array.forEach((value) => {
  
      loadSingleBook(value);
      
  });*/
  
  function loadSingleBook(book, categoryMap) {
    const cardContainer = document.getElementById('card');
    const card = document.createElement('div');
  
    card.innerHTML = 
  
    `<div class="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
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
        <a class="inline-block" href="DettaglioCategoria.html">
          <button
            class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Vai al Dettaglio
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
        </a>
      </div>`
  
    cardContainer.appendChild(card);
  }
  

  loadAllBooks();

