<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem anda";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully <br>";

$sql = "SELECT * FROM produk WHERE id_produk='".$_GET['id']."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo $row["id_produk"].";".$row["nama_produk"].";".$row["harga_produk"].";".$row["kalori_produk"].";".$row["daging"].";".$row["id_jenama"].";".$row["gambar"].";".$row["id_user"]."\n";
  }
} else {
  echo "0 results";
}
$conn->close();