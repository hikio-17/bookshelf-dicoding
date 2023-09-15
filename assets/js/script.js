let bookList = JSON.parse(localStorage.getItem('books')) || [
   {
      id: 1,
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      year: 2005,
      isComplete: false
   },
   {
      id: 2,
      title: 'Pedang Bulan',
      author: 'Andrea Hirata',
      year: 2010,
      isComplete: false
   },
   {
      id: 3,
      title: 'Negeri Para Berdebah',
      author: 'Tere Liye',
      year: 2012,
      isComplete: true
   },
   {
      id: 4,
      title: 'Dear Nathan',
      author: 'Erisca Febriani',
      year: 2016,
      isComplete: false
   },
   {
      id: 5,
      title: 'Marmut Merah Jambu',
      author: 'Raditya Dika',
      year: 2010,
      isComplete: false
   },
   {
      id: 6,
      title: 'Cinta Brontosaurus',
      author: 'Raditya Dika',
      year: 2006,
      isComplete: false
   },
];;

let inCompleteBookshelfPage = true;
let books = getBooksList();
let inCompleteBookshelfList = document.getElementById('inCompleteBookshelfList');
let completeBookshelfList = document.getElementById('completeBookshelfList');

let inputSection = document.getElementById('input-section')
let sectionBookShelf = document.getElementsByClassName('book-shelf')[0]

const btnCancelBookInput = document.getElementById('cancel')
const btnAddBookInput = document.getElementById('add-book')
const btnSubmitAddBook = document.getElementById('bookSubmit')

btnSubmitAddBook.addEventListener('click', onSubmitAddBook)
btnCancelBookInput.addEventListener('click', onCancelBookInput)
btnAddBookInput.addEventListener('click', onAddBookInput)

document.getElementById('searchBookTitle').addEventListener('input', onKeywordSearchChange);
document.getElementById('pageBooksShelf').addEventListener('click', toggleBookshelf);

function onAddBookInput () {
  sectionBookShelf.style.display = 'none'
  inputSection.style.display = 'block'
}

function onCancelBookInput () {
  inputSection.style.display = 'none'
  sectionBookShelf.style.display = 'flex'
}

function deleteBook(id) {
   bookList = bookList.filter((book) => book.id !== id);
   localStorage.setItem('books', JSON.stringify(bookList));
   books = getBooksList();
   updateUI(books);
}

function createBookItem ({ id, title, author, year, isComplete }) {
   const bookItem = document.createElement('article');
   bookItem.classList.add('book-item');
   bookItem.innerHTML = `
      <h3>${title}</h3>
      <div class="horizontal-line"></div>
      <img
      class="book-item__image"
      src="assets/images/people.svg"
      alt="Image Book"
      />
      <p>Penulis: ${author}</p>
      <p>Tahun: ${year}</p>

      <div class="action">
      <button class="green" onclick='onCompletedBook(${id})'>${isComplete ? 'Belum Selesai' : 'Selesai dibaca'}</button>
      </div>
      <button class="red" id='btn-delete' onclick='deleteBook(${id})'>X</button>
   `
   return bookItem;
}

function addToBookList(book) {
   inputSection.style.display = 'none';
   sectionBookShelf.style.display = 'flex';
   bookList.push(book);
   localStorage.setItem('books', JSON.stringify(bookList));
   books = getBooksList()
   updateUI(books);
}

function onSubmitAddBook (event) {
  event.preventDefault()
  const title = document.getElementById('inputBookTitle').value
  const author = document.getElementById('inputBookAuthor').value
  const year = document.getElementById('inputBookYear').value
  const isComplete = document.getElementById('inputBookIsComplete').checked

  const newBook = {
    id: +new Date(),
    title,
    author,
    year,
    isComplete
  }

  addToBookList(newBook);
}

function onKeywordSearchChange(event) {
   const searchBookTitle = document.getElementById('searchBookTitle');
   searchBookTitle.value = event.target.value;
   if (searchBookTitle.value === '') {
      updateUI(books);
   }
   
   if (searchBookTitle.value.length > 0) {
      const resultQuery = books.filter((book) => book.title.toLowerCase().includes(event.target.value.toLowerCase()))
      updateUI(resultQuery);
   }
}


function updateUI(books) {
   inCompleteBookshelfList.innerHTML = null;
   completeBookshelfList.innerHTML = null;
   renderBookList(books);
}

function getBooksList() {
   if (inCompleteBookshelfPage) {
      return bookList.filter((book) => book.isComplete === false);
   } else {
      return bookList.filter((book) => book.isComplete === true);
   }
}

function renderBookList(books) {

   if (books.length === 0) {
      document.getElementById('message').style.display = 'block';
   } else {
      document.getElementById('message').style.display = 'none';
      if (inCompleteBookshelfPage) {
         books.map((book) => {
            const bookItem = createBookItem(book);
            inCompleteBookshelfList.appendChild(bookItem);
         })
      } else {
         books.map((book) => {
            const bookItem = createBookItem(book);
            completeBookshelfList.appendChild(bookItem);
         })
      }
   }
}

function onCompletedBook(id) {
   bookList = bookList.map((book) => {
      if (book.id === id) {
         return { ...book, isComplete: !book.isComplete }
      }
      
      return book;
   });
   
   localStorage.setItem('books', JSON.stringify(bookList));
   books = getBooksList();
   updateUI(books);
}

function toggleBookshelf() {
   inCompleteBookshelfPage = !inCompleteBookshelfPage;
   const completeListDisplay = inCompleteBookshelfPage ? 'none' : 'flex';
   const inCompleteListDisplay = inCompleteBookshelfPage ? 'flex' : 'none';
   
   document.getElementById('completeBookshelfList').style.display = completeListDisplay;
   document.getElementById('inCompleteBookshelfList').style.display = inCompleteListDisplay;
   document.getElementById('mainHeaderTitle').innerText = inCompleteBookshelfPage ? 'Belum Selesai dibaca' : 'Sudah Selesai dibaca';
   
   books = getBooksList();
   updateUI(books);
}

window.addEventListener('load', function() {
   this.localStorage.setItem('books', JSON.stringify(bookList));
   renderBookList(books)
});
