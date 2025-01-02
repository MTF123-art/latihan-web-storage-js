// elemen form
const bookForm = document.getElementById("bookForm");
const Title = bookForm.querySelector("#bookFormTitle");
const Author = bookForm.querySelector("#bookFormAuthor");
const Year = bookForm.querySelector("#bookFormYear");
const IsComplete = bookForm.querySelector("#bookFormIsComplete");

// tambah data
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let timestamp = new Date().getTime();
  let databaru = {
    id: timestamp,
    title: Title.value,
    author: Author.value,
    year: parseInt(Year.value),
    isComplete: IsComplete.checked,
  };

  let data = ambilData();
  data.push(databaru);

  localStorage.setItem("dataBuku", JSON.stringify(data));
  bookForm.reset();
  tampilkanData();
});

function ambilData() {
  return localStorage.getItem("dataBuku") === null
    ? []
    : JSON.parse(localStorage.getItem("dataBuku"));
}

function tampilkanData() {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");
  let data = ambilData();

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  let incompleteBooksHTML = "";
  let completeBooksHTML = "";

  data.forEach((book) => {
    const bookHTML = `
        <div data-bookid="${book.id}" data-testid="bookItem">
           <h3 data-testid="bookItemTitle">${book.title}</h3>
           <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
           <p data-testid="bookItemYear">Tahun: ${book.year}</p>
           <div>
             <button data-testid="bookItemIsCompleteButton" onclick="ubahStatus(${book.id})">${book.isComplete ?  "Belum selesai" : "Selesai dibaca"}</button>
             <button data-testid="bookItemDeleteButton" onclick="hapusBuku(${book.id})">Hapus Buku</button>
             <button data-testid="bookItemEditButton">Edit Buku</button>
           </div>
        </div>
     `;

    if (!book.isComplete) {
      incompleteBooksHTML += bookHTML;
    } else {
      completeBooksHTML += bookHTML;
    }
  });

  incompleteBookList.innerHTML = incompleteBooksHTML;
  completeBookList.innerHTML = completeBooksHTML;
}

function hapusBuku(id) {
   let data = ambilData();
   let updatedData = [];
   data.forEach((book) => {
     if (book.id !== id) {
       updatedData.push(book);
     }
   });
   localStorage.setItem("dataBuku", JSON.stringify(updatedData)); 
   tampilkanData(); 
 }
 

function ubahStatus(id) {
  let data = ambilData();
  data.forEach((book) => {
   if (book.id === id) {
      book.isComplete = !book.isComplete;
   }
  });
  localStorage.setItem("dataBuku", JSON.stringify(data));
  tampilkanData();
}

window.onload = tampilkanData;
