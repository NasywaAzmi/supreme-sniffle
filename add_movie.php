<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $rating = $_POST['rating'];

    $sql = "INSERT INTO movies (title, description, rating) VALUES ('$title', '$description', $rating)";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "error" => $conn->error));
    }
}

$conn->close();
?>
