<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem anda";

$usr = $_GET['username'];
$pass = $_GET['password'];
$email= $_GET['email'];
$phone = $_GET['phone'];
$id = $_GET['id'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully <br>";
//$sql = "INSERT INTO `pengguna` (`id_user`, `nama_user`, `emel`, `no_tel`, `kata_kunci_user`, `aras`) VALUES (NULL, \'test\', \'test@example.com\', \'0123456789\', \'12345678\', \'pengguna\');";
$sql = "INSERT INTO pengguna (id_user,nama_user, emel, no_tel, kata_kunci_user, aras) 
VALUES ('$id','$usr', '$email' ,'$phone', '$pass', 'PENGGUNA')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
//$conn->close();