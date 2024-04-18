$(document).ready(function() {
    // Form penambahan film
    $('#addMovieForm').submit(function(e) {
        e.preventDefault();

        var title = $('#title').val();
        var description = $('#description').val();
        var rating = $('#rating').val();

        $.ajax({
            type: 'POST',
            url: 'add_movie.php',
            data: { title: title, description: description, rating: rating },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert('Film berhasil ditambahkan, Reload page anda');
                } else {
                    alert('Gagal menambahkan film.');
                }
            },
            error: function() {
                alert('Terjadi kesalahan. Silakan coba lagi.');
            }
        });
    });

    // Form penghapusan film
    $('#deleteMovieForm').submit(function(e) {
        e.preventDefault();

        var movieId = $('#movieId').val();

        $.ajax({
            type: 'POST',
            url: 'delete_movie.php',
            data: { movieId: movieId },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert('Film berhasil dihapus! Reload page anda');
                } else {
                    alert('Gagal menghapus film.');
                }
            },
            error: function() {
                alert('Terjadi kesalahan. Silakan coba lagi.');
            }
        });
    });
});

function fetchMovies() {
    $.ajax({
        type: 'GET',
        url: 'get_movies.php',
        dataType: 'json',
        success: function(data) {
            const moviesList = $('#movies-list');
            moviesList.empty();
            data.forEach(movie => {
                const movieItem = $(`
                    <div class="col-md-12 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="card-text">${movie.description}</p>
                                <p class="card-text">Rating: ${movie.rating}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">ID: ${movie.id}</small>
                            </div>
                        </div>
                    </div>
                `);
                moviesList.append(movieItem);
            });
        },
        error: function() {
            alert('Gagal memuat daftar film.');
        }
    });
}
