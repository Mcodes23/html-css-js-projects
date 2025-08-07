const container = document.querySelector(".books-container");
const addBookBtn = document.getElementById("addBtn");
const deleteBookBtn = document.getElementById("deleteBtn");
const modal = document.getElementById("addBookModal");
const closeBtn = document.querySelector(".closeBtn");
const addBookForm = document.getElementById("addBookForm");

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 1200,
    genre: "Self‑help",
    description: "A guide to building good habits and breaking bad ones.",
    image:
      "https://img1.od-cdn.com/ImageType-100/1191-1/{7AD5EDFA-C544-4B69-80A2-9356BB99E131}Img100.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 950,
    genre: "Fiction",
    description: "A young shepherd's journey to follow his dreams.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.2Yo5vKXVIDKkdTPSBIGn1gHaLL?pid=Api",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    price: 1400,
    genre: "Productivity",
    description: "Focus without distraction in a noisy world.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.6B262S29EtWKVmQWcDtEeQHaLp?pid=Api",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 1100,
    genre: "Finance",
    description: "What the rich teach their kids about money.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Hrn1cCiWhipJnLFsKKtkqAHaHa?pid=Api",
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    price: 1350,
    genre: "Memoir",
    description: "Master your mind and defy the odds.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.1GAyXsqnv8tTw9Di0EA4bwHaJQ?pid=Api",
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    price: 1600,
    genre: "Strategy",
    description: "Power dynamics explored through history.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.9z2BdE7m0sCP5qVwEAYL6AHaLH?pid=Api",
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 900,
    genre: "Self-help",
    description: "Timeless principles for success and wealth.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Evowwnrb51t2LoIDKY8tiQHaHa?pid=Api",
  },
  {
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    price: 1450,
    genre: "Psychology",
    description: "Life advice grounded in psychology and philosophy.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.WaxR3P17xQeDGeAEXY_q-QHaLX?pid=Api",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 1700,
    genre: "History",
    description: "A brief history of humankind.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.YCJZMWnJL0Jv3cP5fnsN_gHaLH?pid=Api",
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 1300,
    genre: "Spirituality",
    description: "A guide to spiritual awakening and living in the present.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.zn6Uk7aCL9x5wAGU5pt4GwHaLH?pid=Api",
  },
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    price: 1250,
    genre: "Psychology",
    description:
      "The story of success and what makes high achievers different.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.nqX_QvptJ2J5Xjq2Wu47iwHaLJ?pid=Api",
  },
  {
    title: "Ego is the Enemy",
    author: "Ryan Holiday",
    price: 1150,
    genre: "Philosophy",
    description: "How to master ego before it masters you.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.I1E_eV10pIeoMIqKmtBGdQHaLH?pid=Api",
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 1250,
    genre: "Self-help",
    description: "A counterintuitive approach to living a good life.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.bKUqxnsmM2sK4c2VRa3nMgHaHa?pid=Api",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 1500,
    genre: "Personal Development",
    description: "A principle-centered approach to effectiveness.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.AB-Yvltc0pvIbb-3QHez0wHaLH?pid=Api",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    price: 1050,
    genre: "Philosophy",
    description: "Stoic wisdom from a Roman emperor.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.k0G-HRhO0uEc4crOdF2SfwHaLJ?pid=Api",
  },
];

class Book {
  constructor(
    title,
    author,
    price,
    genre,
    description,
    image,
    id = Book.randomId()
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.genre = genre;
    this.description = description;
    this.image = image;
  }
  static randomId() {
    return crypto?.randomUUID?.() || Math.random().toString(36).substr(2, 9);
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.displayBooks();
  }

  deleteBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.displayBooks();
  }
  displayBooks() {
    container.innerHTML = "";
    this.books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book");
      bookCard.dataset.id = book.id;

      bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Price:</strong> KES ${book.price}</p>
        <p>${book.description}</p>
        <button class="delete" data-id="${book.id}">Delete</button>
      `;

      container.appendChild(bookCard);
    });
  }
}
const myLibrary = new Library();

books.forEach((b) => {
  const book = new Book(
    b.title,
    b.author,
    b.price,
    b.genre,
    b.description,
    b.image
  );
  myLibrary.addBook(book);
});
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(addBookForm);
  const newBook = new Book(
    formData.get("title"),
    formData.get("author"),
    parseInt(formData.get("price")),
    formData.get("genre"),
    formData.get("description"),
    formData.get("image")
  );

  myLibrary.addBook(newBook);
  addBookForm.reset();
  modal.style.display = "none";
});

addBookBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.dataset.id;
    myLibrary.deleteBook(id);
  }
});

deleteBookBtn.addEventListener("click", () => {
  const bookTitle = prompt("Enter the name of the book to delete:");
  if (!bookTitle) return;

  const bookToDelete = myLibrary.books.find(
    (book) => book.title.toLowerCase() === bookTitle.toLowerCase()
  );

  if (bookToDelete) {
    myLibrary.deleteBook(bookToDelete.id);
    alert(`Book "${bookTitle}" deleted.`);
  } else {
    alert(`Book "${bookTitle}" not found.`);
  }
});
