document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const booksContainer = document.getElementById("booksContainer");

  // Function to fetch books from Open Library API
  async function fetchBooks(query) {
    booksContainer.innerHTML = `<p class="col-span-full text-center text-gray-700 text-xl">Loading...</p>`;
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`);
      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        booksContainer.innerHTML = `<p class="col-span-full text-center text-red-500 text-xl">❌ No books found</p>`;
        return;
      }

      // Display books
      booksContainer.innerHTML = "";
      data.docs.forEach(book => {
        const cover = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/150x220?text=No+Cover";

        const author = book.author_name ? book.author_name.join(", ") : "Unknown Author";
        const year = book.first_publish_year || "N/A";

        const card = document.createElement("div");
        card.className = "book-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 relative";

        card.innerHTML = `
          <img src="${cover}" alt="${book.title}" class="w-full h-64 object-cover">
          <div class="p-4">
            <h4 class="book-title font-bold text-lg mb-2">${book.title}</h4>
            <p class="text-gray-600 mb-2 text-sm sm:text-base">by ${author}</p>
            <p class="text-gray-500 mb-2 text-sm sm:text-base">📅 ${year}</p>
            <div class="flex justify-between items-center">
              <a href="https://openlibrary.org/search?q=${encodeURIComponent(book.title)}" target="_blank" class="text-green-600 hover:underline text-sm sm:text-base">Read more</a>
              <button class="favorite-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400 transition text-sm">❤</button>
            </div>
          </div>
        `;
        booksContainer.appendChild(card);
      });

    } catch (error) {
      console.error("Error fetching books:", error);
      booksContainer.innerHTML = `<p class="col-span-full text-center text-red-500 text-xl">⚠️ Something went wrong. Try again.</p>`;
    }
  }

  // Search button click
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchBooks(query);
    } else {
      booksContainer.innerHTML = `<p class="col-span-full text-center text-yellow-500 text-xl">Please enter a book name ✏️</p>`;
    }
  });

  // Enter key triggers search
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });
});



