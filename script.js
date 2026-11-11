function showHome() {
      document.getElementById('homePage').classList.remove('hidden');
      document.getElementById('genrePage').classList.remove('active');
      document.getElementById('homeNav').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showGenre(genre) {
      const cards = Array.from(document.querySelectorAll('.movie-row'));
      const matches = cards.filter(card => card.dataset.genre.split(' ').includes(genre));
      const target = document.getElementById('genreMovies');
      target.innerHTML = '';
      matches.forEach(card => target.appendChild(card.cloneNode(true)));
      document.getElementById('genreTitle').textContent = genre;
      const descriptions = {
        'Action': 'Film penuh aksi, pertarungan, ketegangan, dan petualangan.',
        'Drama': 'Cerita yang berfokus pada karakter, emosi, dan konflik kehidupan.',
        'Sci-Fi': 'Jelajahi ide futuristik, teknologi, ruang angkasa, dan kemungkinan masa depan.'
      };
      document.getElementById('genreDescription').textContent = descriptions[genre] || 'Kumpulan film pilihan dari genre ini.';
      document.getElementById('genreEmpty').style.display = matches.length ? 'none' : 'block';
      document.getElementById('homePage').classList.add('hidden');
      document.getElementById('genrePage').classList.add('active');
      document.getElementById('homeNav').classList.remove('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showDetails(title, year, genre, description, rating) {
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalMeta').textContent = year + ' • ' + genre;
      document.getElementById('modalDescription').textContent = description;
      document.getElementById('modalRating').textContent = rating;
      bootstrap.Modal.getOrCreateInstance(document.getElementById('detailModal')).show();
    }

    function searchMovies() {
      const query = document.getElementById('searchInput').value.trim().toLowerCase();
      const cards = document.querySelectorAll('#homePage .movie-row');
      let visible = 0;
      cards.forEach(card => {
        const match = (card.dataset.title + ' ' + card.dataset.genre + ' ' + card.textContent).toLowerCase().includes(query);
        card.style.display = match ? 'grid' : 'none';
        if (match) visible++;
      });
      document.querySelectorAll('#homePage .genre-section').forEach(section => {
        const hasVisible = Array.from(section.querySelectorAll('.movie-row')).some(card => card.style.display !== 'none');
        section.style.display = hasVisible ? 'block' : 'none';
      });
      document.getElementById('emptyState').style.display = visible ? 'none' : 'block';
    }

    document.getElementById('searchInput').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') searchMovies();
    });
    document.getElementById('searchInput').addEventListener('input', function() {
      if (!this.value.trim()) {
        document.querySelectorAll('#homePage .movie-row').forEach(card => card.style.display = 'grid');
        document.querySelectorAll('#homePage .genre-section').forEach(section => section.style.display = 'block');
        document.getElementById('emptyState').style.display = 'none';
      }
    });
