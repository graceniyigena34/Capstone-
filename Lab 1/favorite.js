// favorite.js
// This script handles adding and removing favorite books using localStorage

// Function to add a book to favorites
function addToFavorites(book) {
  // Get the current favorites from localStorage, or initialize an empty array
  const favorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

  // Check if the book is already in favorites (using a unique id)
  const exists = favorites.some(fav => fav.id === book.id);
  if (exists) {
    alert(`${book.title} is already in your favorites!`);
    return;
  }

  // Add the new book to favorites
  favorites.push(book);

  // Save the updated favorites array to localStorage
  localStorage.setItem("favoriteBooks", JSON.stringify(favorites));

  alert(`${book.title} added to your favorites!`);
}

// Function to remove a book from favorites (optional if you want manual removal)
function removeFromFavorites(bookId) {
  const favorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
  const updatedFavorites = favorites.filter(book => book.id !== bookId);
  localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
}

// Export functions if needed for fetchbooks.js or inline scripts
// Example usage: addToFavorites({id: 1, title: "Book Title", author: "Author", cover: "cover.jpg"})
