 const favoritesContainer = document.getElementById('favorites-container');
  const heroMsg = document.getElementById('favorites-hero-msg');

  
  const allBooks = [
    
    
  

  ];

  // Load favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if(favorites.length === 0){
    heroMsg.textContent = "You haven't added any books to your favorites yet.";
  } else {
    heroMsg.textContent = "Here are your favorite books:";
    favorites.forEach(title => {
      const book = allBooks.find(b => b.title === title);
      if(book){
        const card = document.createElement('div');
        card.className = 'bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 relative';
        card.innerHTML = `
          <img src="${book.img}" alt="${book.title} Cover" class="w-full h-64 object-cover">
          <div class="p-4">
            <h4 class="font-bold text-lg mb-2">${book.title}</h4>
            <p class="text-gray-600 mb-2 text-sm sm:text-base">by ${book.author}</p>
            <div class="flex justify-between items-center">
              <a href="${book.link}" target="_blank" class="text-green-600 hover:underline text-sm sm:text-base">Read more</a>
              <button class="remove-favorite-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400 transition text-sm">Remove ❤</button>
            </div>
          </div>
        `;
        favoritesContainer.appendChild(card);

        // Add remove functionality
        card.querySelector('.remove-favorite-btn').addEventListener('click', () => {
          const index = favorites.indexOf(title);
          if(index > -1){
            favorites.splice(index,1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            card.remove();
            if(favorites.length === 0){
              heroMsg.textContent = "You haven't added any books to your favorites yet.";
            }
          }
        });
      }
    });
  }