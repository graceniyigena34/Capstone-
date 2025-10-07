// Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const booksContainer = document.getElementById('booksContainer');
    const bookCards = Array.from(document.querySelectorAll('.book-card'));

    function filterBooks() {
      const query = searchInput.value.toLowerCase();
      bookCards.forEach(card => {
        const title = card.querySelector('.book-title').textContent.toLowerCase();
        card.style.display = title.includes(query) ? '' : 'none';
      });
    }

    searchBtn.addEventListener('click', filterBooks);
    searchInput.addEventListener('keyup', filterBooks);

    // Favorite functionality
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.book-card');
        const title = card.querySelector('.book-title').textContent;
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (!favorites.includes(title)) {
          favorites.push(title);
          btn.classList.add('bg-green-500');
          btn.classList.remove('bg-red-500');
        } else {
          favorites = favorites.filter(f => f !== title);
          btn.classList.add('bg-red-500');
          btn.classList.remove('bg-green-500');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites:', favorites);
      });
    });