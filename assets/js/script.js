let inCompleteBookshelfList = document.getElementById('inCompleteBookshelfList');
let completeBookshelfList = document.getElementById('completeBookshelfList');
let inputSection = document.getElementById('input-section');

const btnCancelBookInput = document.getElementById('cancel');
const btnAddBookInput = document.getElementById('add-book');
const btnSubmitAddBook = document.getElementById('bookSubmit');

function onAddBookInput() {
   inCompleteBookshelfList.style.display = 'none';
   inputSection.style.display = 'block';
}

function onCancelBookInput() {
   inputSection.style.display = 'none';
   inCompleteBookshelfList.style.display = 'block';
}

function onSubmitAddBook(event) {
   event.preventDefault();
   const title = document.getElementById('inputBookTitle').value;
   const author = document.getElementById('inputBookAuthor').value;
   const year = document.getElementById('inputBookYear').value;
   const isComplete = document.getElementById('inputBookIsComplete').value;

   const newBook = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete,
   };

   console.log(newBook);
}

btnSubmitAddBook.addEventListener('click', onSubmitAddBook);
btnCancelBookInput.addEventListener('click', onCancelBookInput);
btnAddBookInput.addEventListener('click', onAddBookInput);


