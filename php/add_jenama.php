<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem anda";

$nama = $_GET['nama'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "INSERT INTO jenama (jenama) VALUES ('$nama');";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
//$conn->close();