<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem anda";

$id = $_GET['id'];
$user_id = $_GET['usr'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "INSERT INTO pilihan (id_user,id_produk) VALUES ('$user_id','$id');";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
//$conn->close();