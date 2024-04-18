<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo '<script>alert("Registrasi berhasil!"); window.location.href = "login.html";</script>';
    } else {
        echo '<script>alert("Registrasi gagal."); window.location.href = "register.html";</script>';
    }
}

$conn->close();
?>
