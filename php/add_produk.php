<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem anda";

$nama = $_GET["nama"];
$harga = $_GET["harga"];
$kalori = $_GET["kalori"];
$daging = $_GET["daging"];
$jenama = $_GET["jenama"];
$usr_id = $_GET["usr_id"];
$gambar = $_GET['gambar'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully <br>";
//$sql = "INSERT INTO `pengguna` (`id_user`, `nama_user`, `emel`, `no_tel`, `kata_kunci_user`, `aras`) VALUES (NULL, \'test\', \'test@example.com\', \'0123456789\', \'12345678\', \'pengguna\');";
$sql = "INSERT INTO produk (nama_produk, harga_produk, kalori_produk, id_jenama, gambar, daging, id_user) 
VALUES ('$nama', '$harga', '$kalori', '$jenama', '$gambar', '$daging', '$usr_id');";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
//$conn->close();