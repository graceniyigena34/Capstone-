// fetchbooks.js
// This script fetches books from Open Library API and displays them on the homepage

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const popularBooksSection = document.querySelector("section.py-16"); // Popular Books section

  // Function to fetch books from Open Library API
  async function fetchBooks(query) {
    // Clear previous results
    popularBooksSection.innerHTML = `<p class="text-center col-span-full text-gray-600">Loading...</p>`;

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const books = data.docs;

      if (books.length === 0) {
        popularBooksSection.innerHTML = `<p class="text-center col-span-full text-gray-600">No books found.</p>`;
        return;
      }

      // Clear the section
      popularBooksSection.innerHTML = "";
      popularBooksSection.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-6");

      books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bg-white", "rounded-lg", "shadow-md", "overflow-hidden");

        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "placeholder.jpg";

        const author = book.author_name ? book.author_name.join(", ") : "Unknown Author";

        bookCard.innerHTML = `
          <img src="${coverUrl}" alt="${book.title}" class="w-full h-64 object-cover">
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2">${book.title}</h3>
            <p class="text-gray-600 mb-2">${author}</p>
            <button class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded w-full add-fav-btn">Add to Favorites</button>
          </div>
        `;

        // Add to favorites button
        bookCard.querySelector(".add-fav-btn").addEventListener("click", () => {
          addToFavorites({
            id: book.key,  // Unique Open Library key
            title: book.title,
            author: author,
            cover: coverUrl
          });
        });

        popularBooksSection.appendChild(bookCard);
      });

    } catch (error) {
      popularBooksSection.innerHTML = `<p class="text-center col-span-full text-red-500">Error fetching books: ${error.message}</p>`;
      console.error(error);
    }
  }

  // Initial fetch: show some popular books
  fetchBooks("best sellers");

  // Search button click
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchBooks(query);
  });

  // Enter key in input triggers search
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) fetchBooks(query);
    }
  });
});
