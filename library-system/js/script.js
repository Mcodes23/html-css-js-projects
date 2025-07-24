const container = document.querySelector(".books-container");
const addBookBtn = document.getElementById("addBtn");
const deleteBookBtn = document.getElementById("deleteBtn");
const modal = document.getElementById("addBookModal");
const closeBtn = document.querySelector(".closeBtn");
const addBookForm = document.getElementById("addBookForm");

function randomId() {
  return crypto.randomUUID();
}
function Book(title, author, price, genre, description, image) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.price = price;
  this.genre = genre;
  this.description = description;
  this.image = image;
}

const books = [
  new Book(
    "Atomic Habits",
    "James Clear",
    1200,
    "Self‑help",
    "A guide to building good habits and breaking bad ones.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg1.od-cdn.com%2FImageType-100%2F1191-1%2F%257B7AD5EDFA-C544-4B69-80A2-9356BB99E131%257DImg100.jpg&f=1&nofb=1&ipt=ba65279bf2b9be0dbf4a987e73b164a89b0e4e3119f95c85b9490ea9cb64d014"
  ),
  new Book(
    "The Alchemist",
    "Paulo Coelho",
    950,
    "Fiction",
    "A young shepherd's journey to follow his dreams.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.2Yo5vKXVIDKkdTPSBIGn1gHaLL%3Fr%3D0%26pid%3DApi&f=1&ipt=d289e3bd6ea7d5f1d64d479fa912360388589c3a2448f8aa5ffba87420794db1&ipo=images"
  ),
  new Book(
    "Deep Work",
    "Cal Newport",
    1400,
    "Productivity",
    "Focus without distraction in a noisy world.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.6B262S29EtWKVmQWcDtEeQHaLp%3Fpid%3DApi&f=1&ipt=3becdd2a7dbc6d4ba6b464b6ad98aec6819c63eb0f52afaebd026758a7d54b7b&ipo=images"
  ),
  new Book(
    "Rich Dad Poor Dad",
    "Robert Kiyosaki",
    1100,
    "Finance",
    "What the rich teach their kids about money.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.Hrn1cCiWhipJnLFsKKtkqAHaHa%3Fpid%3DApi&f=1&ipt=a251934389e2d31c35ec63845520c568065cd9fea38f7e64b82086aa7f100780&ipo=images"
  ),
  new Book(
    "Can't Hurt Me",
    "David Goggins",
    1350,
    "Memoir",
    "Master your mind and defy the odds.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.1GAyXsqnv8tTw9Di0EA4bwHaJQ%3Fpid%3DApi&f=1&ipt=f31324ef3c3ca029d261351cfb4a37aa0195a5ec6f318742cf4a8afa030d5093&ipo=images"
  ),
  new Book(
    "Think Like a Monk",
    "Jay Shetty",
    1250,
    "Self‑help",
    "Train your mind for peace and purpose.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.vLHXNXNfyf0j0FeH7mKEkQHaD4%3Fpid%3DApi&f=1&ipt=fea46e7d8604983e6529e2feb3eb80162849e5cca830f7842e96f14f06907595&ipo=images"
  ),
  new Book(
    "1984",
    "George Orwell",
    900,
    "Dystopian",
    "A chilling vision of a totalitarian future.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.8bTpGDLEYVpDlV8tD10XlQAAAA%3Fr%3D0%26pid%3DApi&f=1&ipt=44a50bd189c1f62b5d86ac0a3cca367346da9c2347f1ad2491575ae16856bf24&ipo=images"
  ),
  new Book(
    "Sapiens",
    "Yuval Noah Harari",
    1600,
    "History",
    "A brief history of humankind.",
    "https://tinyurl.com/5n75tp6h"
  ),
  new Book(
    "The Subtle Art of Not Giving a F*ck",
    "Mark Manson",
    1300,
    "Self‑help",
    "A counterintuitive approach to living a good life.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.ZYqBjPOQORWQNe5KPXoG5gHaLG%3Fpid%3DApi&f=1&ipt=4212d7cb40bcb0202fdf16ebbe6a6b2c80b10b8e00b5ede35e0b94544cd6da81&ipo=images"
  ),
  new Book(
    "The Lean Startup",
    "Eric Ries",
    1450,
    "Business",
    "How today's entrepreneurs use continuous innovation.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.oDduHsuocfUfgFbo47owNwAAAA%3Fpid%3DApi&f=1&ipt=ca217751d3111e80e7439a25ffac51b49934888033f04d4d18ba89ab98bb5205&ipo=images"
  ),
  new Book(
    "The Power of Now",
    "Eckhart Tolle",
    1150,
    "Spirituality",
    "A guide to spiritual enlightenment.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.-Srxx98TPWXPoCwHJCeFhAHaLc%3Fpid%3DApi&f=1&ipt=7e244550d936c69ff555fc357772e35ee619118775699140aba87c6e83e9de49&ipo=images"
  ),
  new Book(
    "The 48 Laws of Power",
    "Robert Greene",
    1550,
    "Psychology",
    "A modern classic on power dynamics.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.RWjmpY8hHUpcEtmgdn0TNAHaJl%3Fpid%3DApi&f=1&ipt=f2a96bb32caf1862c41c03bd6bf7347a8ff886aa5d3d8fa76cd0e7fff35a50fd&ipo=images"
  ),
  new Book(
    "Zero to One",
    "Peter Thiel",
    1250,
    "Business",
    "Notes on startups and how to build the future.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.Uvq_pxVqD31H7s7oCwBNfAAAAA%3Fpid%3DApi&f=1&ipt=22e7ee010409983876b164573e5889b7d6283d5ce276ddd22cdacfa3aeeab225&ipo=images"
  ),
  new Book(
    "To Kill a Mockingbird",
    "Harper Lee",
    950,
    "Fiction",
    "A story about race and justice in the Deep South.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.Mn5V-w7UJJcl8GHULqhI6QAAAA%3Fpid%3DApi&f=1&ipt=21b53f4b4b1936fac5997e6bfab9a16f07cf88348753563c56b2af1afd48d389&ipo=images"
  ),
  new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    1000,
    "Fantasy",
    "A journey through Middle‑earth with Bilbo Baggins.",
    "https://upload.wikimedia.org/wikipedia/en/3/30/Hobbit_cover.JPG"
  ),
  new Book(
    "Ikigai",
    "Héctor García",
    1050,
    "Self‑help",
    "The Japanese secret to a long and happy life.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.Z_mPbgN66O_bd8N2kAw_NwAAAA%3Fpid%3DApi&f=1&ipt=f35653a2f05e0bde9a247f3ed94ab8caba8f98a346b168c339be1de600fade88&ipo=images"
  ),
  new Book(
    "The Four Agreements",
    "Don Miguel Ruiz",
    950,
    "Philosophy",
    "A practical guide to personal freedom.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.2BlpGsC4l9fvKVn0O4xeKwAAAA%3Fr%3D0%26pid%3DApi&f=1&ipt=e7e4965d7ad8b88f559e1200cc93ea2888687aa6f5fbec6cbc9b83272933c7d1&ipo=images"
  ),
  new Book(
    "Start With Why",
    "Simon Sinek",
    1200,
    "Leadership",
    "How great leaders inspire everyone to take action.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.jvyi5bUPi-vUjafvJJrUsgAAAA%3Fpid%3DApi&f=1&ipt=c56ff7534d147677c270ad3609a973ef8098b5384e85efabe0b13ec2092b5254&ipo=images"
  ),
  new Book(
    "Man's Search for Meaning",
    "Viktor E. Frankl",
    1150,
    "Psychology",
    "A psychologist’s experience in Nazi death camps.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.zw6wN0yFx8Cp03XX41O0vAAAAA%3Fpid%3DApi&f=1&ipt=f711376be1872cb7b5f0291d9a4bea598c2d9b05b56211904a3f549d27226af5&ipo=images"
  ),
  new Book(
    "Meditations",
    "Marcus Aurelius",
    950,
    "Philosophy",
    "Wisdom and reflections from a Roman emperor.",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.mcx-LPcxPDJrqxYtftF2UQAAAA%3Fr%3D0%26pid%3DApi&f=1&ipt=8a397e407dcb642114b8a4c5afd3f2d20c288845102cb81977ddf0b47905b1d9&ipo=images"
  ),
];

books.forEach(displayBook);

function addBookToLibrary(title, author, price, genre, description, image) {
  const newBook = new Book(title, author, price, genre, description, image);
  books.push(newBook);
  return newBook;
}

function displayBook(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");
  bookCard.dataset.id = book.id;

  bookCard.innerHTML = `
    <img src="${book.image}" alt="${book.title}" />
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    <p><strong>Price:</strong> Ksh ${book.price}</p>
    <p>${book.description}</p>
  `;

  container.appendChild(bookCard);
}
//  Events

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

addBookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const price = document.getElementById("bookPrice").value;
  const genre = document.getElementById("bookGenre").value;
  const description = document.getElementById("bookDescription").value;
  const image = document.getElementById("bookImage").value;

  const newBook = addBookToLibrary(
    title,
    author,
    price,
    genre,
    description,
    image
  );
  displayBook(newBook);

  addBookForm.reset();
  modal.style.display = "none";
});

deleteBookBtn.addEventListener("click", () => {
  const bookTitle = prompt("Enter the name of the book to delete:");

  if (!bookTitle) return;
  const index = books.findIndex(
    (book) => book.title.toLowerCase() === bookTitle.toLowerCase()
  );

  if (index !== -1) {
    const deletedBook = books[index];

    books.splice(index, 1);

    const bookCard = container.querySelector(`[data-id="${deletedBook.id}"]`);
    if (bookCard) {
      container.removeChild(bookCard);
    }

    alert(`Book "${bookTitle}" deleted.`);
  } else {
    alert(`Book "${bookTitle}" not found.`);
  }
});
