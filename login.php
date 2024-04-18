<?php
session_start();
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === 'admin' && $password === 'admin123') {
        $_SESSION['admin_username'] = $username;
        echo '<script>alert("Login sebagai Admin"); window.location.href = "admin.html";</script>';
        exit;
    }

    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $_SESSION['username'] = $username;
        echo '<script>alert("Login berhasil!"); window.location.href = "index.html";</script>';
    } else {
        echo '<script>alert("Login gagal. Username atau password salah."); window.location.href = "login.html?error=1";</script>';
    }
}

$conn->close();
?>
