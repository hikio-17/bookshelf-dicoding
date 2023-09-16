let bookList = JSON.parse(localStorage.getItem('books')) || [
  {
    id: 1,
    title: 'Sang Pemimpi 2006',
    author: 'Andrea Hirata',
    year: 2006,
    isComplete: false
  },
  {
    id: 2,
    title: 'Orang-Orang Biasa 2020',
    author: 'Andrea Hirata',
    year: 2010,
    isComplete: false
  },
  {
    id: 3,
    title: 'Negeri Para Berdebah',
    author: 'Tere Liye',
    year: 2012,
    isComplete: false
  },
  {
    id: 4,
    title: 'Dear Nathan 2016',
    author: 'Erisca Febriani',
    year: 2016,
    isComplete: true
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
  {
    id: 7,
    title: 'Tentang Kamu',
    author: 'Tere Liye',
    year: 2006,
    isComplete: true
  }
]

let inCompleteBookshelfPage = true
let books = getBooksList()

let inCompleteBookshelfList = document.getElementById('inCompleteBookshelfList')
let completeBookshelfList = document.getElementById('completeBookshelfList')

let inputSection = document.getElementById('input-section')
let editInputSection = document.getElementById('editInputSection')
let sectionBookShelf = document.getElementsByClassName('book-shelf')[0]

const btnCancelBookInput = document.getElementById('cancel')
const btnAddBookInput = document.getElementById('add-book')
const btnSubmitAddBook = document.getElementById('bookSubmit')
const btnSubmitEditBook = document.getElementById('btnEditBook')
const btnPageBookShelf = document.getElementById('pageBooksShelf')
const message = document.getElementById('message')

btnPageBookShelf.innerText = inCompleteBookshelfList
  ? 'Comleted'
  : 'Incompleted'

btnSubmitAddBook.addEventListener('click', onSubmitAddBook)
btnCancelBookInput.addEventListener('click', onCancelBookInput)
btnAddBookInput.addEventListener('click', onAddBookInput)
btnSubmitEditBook.addEventListener('click', onSubmitEditBook)

document
  .getElementById('searchBookTitle')
  .addEventListener('input', onKeywordSearchChange)
document
  .getElementById('pageBooksShelf')
  .addEventListener('click', toggleBookshelf)

function hideBooksShelfPage () {
  completeBookshelfList.style.display = 'none'
  sectionBookShelf.style.display = 'none'
  inCompleteBookshelfList.style.display = 'none'
}

function onAddBookInput () {
  inputSection.style.display = 'block'
  editInputSection.style.display = 'none'
  message.style.display = 'none'
  hideBooksShelfPage()
}

function onCancelBookInput () {
  inputSection.style.display = 'none'
  sectionBookShelf.style.display = 'flex'

  if (books.length === 0) {
    message.style.display = 'block'
  }
}

function deleteBook (id) {
  let confirmDelete = confirm(
    `Apakah anda yakin untuk menghapus buku dengan id ${id}`
  )

  if (confirmDelete) {
    bookList = bookList.filter(book => book.id !== id)
    localStorage.setItem('books', JSON.stringify(bookList))
    books = getBooksList()
    updateUI(books)
  }
}

function createBookItem ({ id, title, author, year, isComplete }) {
  const bookItem = document.createElement('article')
  bookItem.classList.add('book-item')
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

      <div class='action'>
      <button class="warning" id='btn-edit' onclick='editBook(${id})'>Edit</button>
      <button class="green" onclick='onCompletedBook(${id})'>${
    isComplete ? 'in Completed' : 'Completed'
  }</button>
      </div>

      <button class="red" id='btn-delete' onclick='deleteBook(${id})'>X</button>
   `
  return bookItem
}

function addToBookList (book) {
  inputSection.style.display = 'none'
  sectionBookShelf.style.display = 'flex'
  inCompleteBookshelfList.style.display = 'flex'
  completeBookshelfList.style.display = 'flex'

  bookList.push(book)
  clearFormInput()
  localStorage.setItem('books', JSON.stringify(bookList))
  books = getBooksList()
  updateUI(books)
}

function clearFormInput () {
  document.getElementById('inputBookTitleEdit').value = ''
  document.getElementById('inputBookAuthorEdit').value = ''
  document.getElementById('inputBookYearEdit').value = ''
  document.getElementById('inputBookIsCompleteEdit').checked = false

  document.getElementById('inputBookTitle').value = ''
  document.getElementById('inputBookAuthor').value = ''
  document.getElementById('inputBookYear').value = ''
  document.getElementById('inputBookIsComplete').checked = false
}

function editBook (id) {
  editInputSection.style.display = 'block'
  inputSection.style.display = 'none'
  hideBooksShelfPage()
  const oldBook = bookList.find(book => book.id === id)

  const title = document.getElementById('inputBookTitleEdit')
  const author = document.getElementById('inputBookAuthorEdit')
  const year = document.getElementById('inputBookYearEdit')
  const isComplete = document.getElementById('inputBookIsCompleteEdit')

  title.value = oldBook.title
  author.value = oldBook.author
  year.value = oldBook.year
  isComplete.checked = oldBook.isComplete

  btnSubmitEditBook.addEventListener('click', event => {
    onSubmitEditBook(oldBook)
    event.stopPropagation()
  })
}

function onSubmitEditBook (oldBook) {
  editInputSection.style.display = 'none'
  sectionBookShelf.style.display = 'flex'

  const { title, author, year, isComplete, id } = oldBook

  const updateTitle = document.getElementById('inputBookTitleEdit').value
  const updateAuthor = document.getElementById('inputBookAuthorEdit').value
  const updateYear = document.getElementById('inputBookYearEdit').value
  const updateIsComplete = document.getElementById(
    'inputBookIsCompleteEdit'
  ).checked

  const updateBook = {
    title: updateTitle || title,
    author: updateAuthor || author,
    year: updateYear || year,
    isComplete: updateIsComplete || isComplete
  }

  bookList = bookList.map(book => {
    if (book.id === id) {
      return {
        ...book,
        ...updateBook
      }
    }
    return book
  })
  localStorage.setItem('books', JSON.stringify(bookList))
  books = getBooksList()
  updateUI(books)
}

function validateInputBook ({ title, author, year }) {
  if (title === '') {
    window.alert('Title tidak boleh kosong!')
    return
  }

  if (author === '') {
    window.alert('Author tidak boleh kosong!')
    return
  }

  if (year === '') {
    window.alert('Year tidak boleh kosong')
    return
  }

  return true
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

  if (validateInputBook(newBook)) {
    addToBookList(newBook)
    clearFormInput()
  }
}

function onKeywordSearchChange (event) {
  const searchBookTitle = document.getElementById('searchBookTitle')
  searchBookTitle.value = event.target.value
  if (searchBookTitle.value === '') {
    updateUI(books)
  }

  if (searchBookTitle.value.length > 0) {
    const resultQuery = books.filter(book =>
      book.title.toLowerCase().includes(event.target.value.toLowerCase())
    )
    updateUI(resultQuery)
  }
}

function updateUI (books) {
  inCompleteBookshelfList.innerHTML = null
  completeBookshelfList.innerHTML = null
  renderBookList(books)
}

function getBooksList () {
  if (inCompleteBookshelfPage) {
    return bookList.filter(book => book.isComplete === false)
  } else {
    return bookList.filter(book => book.isComplete === true)
  }
}

function renderBookList (books) {
  if (books.length === 0) {
    document.getElementById('message').style.display = 'block'
  } else {
    document.getElementById('message').style.display = 'none'
    if (inCompleteBookshelfPage) {
      books.map(book => {
        const bookItem = createBookItem(book)
        inCompleteBookshelfList.appendChild(bookItem)
      })
    } else {
      books.map(book => {
        const bookItem = createBookItem(book)
        completeBookshelfList.appendChild(bookItem)
      })
    }
  }
}

function onCompletedBook (id) {
  bookList = bookList.map(book => {
    if (book.id === id) {
      return { ...book, isComplete: !book.isComplete }
    }

    return book
  })

  localStorage.setItem('books', JSON.stringify(bookList))
  books = getBooksList()
  updateUI(books)
}

function toggleBookshelf () {
  inputSection.style.display = 'none'
  editInputSection.style.display = 'none'
  sectionBookShelf.style.display = 'flex'

  inCompleteBookshelfPage = !inCompleteBookshelfPage
  const completeListDisplay = inCompleteBookshelfPage ? 'none' : 'flex'
  const inCompleteListDisplay = inCompleteBookshelfPage ? 'flex' : 'none'

  btnPageBookShelf.innerText = inCompleteBookshelfPage
    ? 'Comleted'
    : 'Incompleted'
  document.getElementById('completeBookshelfList').style.display =
    completeListDisplay
  document.getElementById('inCompleteBookshelfList').style.display =
    inCompleteListDisplay
  document.getElementById('mainHeaderTitle').innerText = inCompleteBookshelfPage
    ? 'Belum Selesai dibaca'
    : 'Sudah Selesai dibaca'

  books = getBooksList()
  updateUI(books)
}

renderBookList(books)
