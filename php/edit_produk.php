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
$gambar = $_GET['gambar'];
$ids = $_GET['id_produk'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully <br>";
$sql = "UPDATE produk SET nama_produk = '$nama', harga_produk = '$harga', kalori_produk = '$kalori', id_jenama = '$jenama', gambar = '$gambar', daging = '$daging' WHERE produk.id_produk = $ids;";


if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
//$conn->close();
