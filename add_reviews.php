<?php
include 'koneksi.php';

$data = json_decode(file_get_contents('php://input'), true);
$movieId = $data['movie_id'];
$reviewText = $conn->real_escape_string($data['review_text']);

$sql = "INSERT INTO reviews (movie_id, review_text) VALUES ('$movieId', '$reviewText')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>
