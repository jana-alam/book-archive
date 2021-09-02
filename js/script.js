const getElement = (id) => document.getElementById(id);
const searchInput = getElement("search-input");
const serachButton = getElement("search-button");
const bookContainer = getElement("book-container");
const spinner = getElement("spinner");
const errorDiv = getElement("error");
const successDiv = getElement("success");

// handling event when user clicks search button
serachButton.addEventListener("click", () => {
  const searchText = searchInput.value;
  errorDiv.classList.add("d-none");
  bookContainer.classList.add("d-none");
  successDiv.classList.add("d-none");
  if (searchText.length === 0) {
    errorDiv.classList.remove("d-none");
    errorDiv.innerHTML = "Please type a book name to search";
    return;
  } else {
    bookContainer.textContent = ""; //clearing book conatainer
    spinner.classList.remove("d-none");
    searchInput.value = ""; //clearing search input value.
    // loading data here
    loadData(`https://openlibrary.org/search.json?q=${searchText}`);
  }
});

// function to load data

const loadData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => showBooks(data));
};

// function to show books

const showBooks = (data) => {
  const books = data.docs;

  if (books.length === 0) {
    errorDiv.classList.remove("d-none");
    errorDiv.innerHTML = "Oops !No data Found";
    spinner.classList.add("d-none");
  } else {
    // looping the results
    successDiv.innerHTML = `Showing ${books.length} results of ${data.numFound}`;
    books.forEach((book) => {
      // declared related variable by ternary operator
      const imgSrc = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : `img/images.png`;
      const author_name = book.author_name
        ? book.author_name.toString()
        : "Unknown Author";
      const publishedBy = book.publisher
        ? book.publisher.toString()
        : "Publisher Unknown";
      const publishedYear = book.first_publish_year
        ? book.first_publish_year
        : "Unknown";
      const div = document.createElement("div");
      div.classList.add("col");

      div.innerHTML = `
      <div class="card h-100 p-0">
        <div class="p-0">
          <img
            src="${imgSrc}"
            class="card-img-top book-cover-page"
            alt="Book Cover Page"
          />
        </div>
        <div class="card-body p-2">
          <h6 class="card-title fw-bold">${book.title}</h6>
          <div class="card-text d-flex flex-column">
           <p>by <span class="fst-italic mb-2"> ${author_name}</span></p>
           <p class="book-published text-muted">First Published <span class="fst-italic">${publishedYear}</span></br>
           by <span class="fst-italic">${publishedBy}</span></p>
          </div>
        </div>
      </div>`;
      //append here
      bookContainer.appendChild(div);
    });

    successDiv.classList.remove("d-none");
    bookContainer.classList.remove("d-none");
    spinner.classList.add("d-none");
  }
};
