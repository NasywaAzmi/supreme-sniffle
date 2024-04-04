document.addEventListener("DOMContentLoaded", function() {
    fetchMovies();
});

function fetchMovies() {
    fetch('get_movies.php')
    .then(response => response.json())
    .then(data => {
        const moviesList = document.getElementById('movies-list');
        moviesList.innerHTML = '';
        data.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <p>Rating: ${movie.rating}</p>
                <p><strong>Reviews:</strong></p>
                <ul id="reviews-${movie.id}"></ul>
                <input type="text" placeholder="Your review" id="review-${movie.id}">
                <button onclick="addReview(${movie.id})">Add Review</button>
            `;
            moviesList.appendChild(movieDiv);
            fetchReviews(movie.id);
        });
    });
}

function fetchReviews(movieId) {
    fetch(`get_reviews.php?movie_id=${movieId}`)
    .then(response => response.json())
    .then(data => {
        const reviewsList = document.getElementById(`reviews-${movieId}`);
        reviewsList.innerHTML = '';
        data.forEach(review => {
            const li = document.createElement('li');
            li.textContent = review.review_text;
            reviewsList.appendChild(li);
        });
    });
}

function addReview(movieId) {
    const reviewInput = document.getElementById(`review-${movieId}`);
    const reviewText = reviewInput.value.trim();
    if (reviewText !== '') {
        fetch('add_review.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movie_id: movieId,
                review_text: reviewText,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchReviews(movieId);
                reviewInput.value = '';
            } else {
                alert('Failed to add review.');
            }
        });
    }
}
