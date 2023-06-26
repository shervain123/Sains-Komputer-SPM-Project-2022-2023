<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem anda";

$nama = $_GET["nama"];
$id = $_GET["id"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully <br>";
$sql = "UPDATE jenama SET jenama = '$nama' WHERE jenama.id_jenama = $id;";


if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
//$conn->close();
