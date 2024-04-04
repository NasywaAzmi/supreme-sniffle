<?php
include 'koneksi.php';

$movieId = $_GET['movie_id'];
$sql = "SELECT * FROM reviews WHERE movie_id = $movieId";
$result = $conn->query($sql);

$reviews = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
}

echo json_encode($reviews);
?>
