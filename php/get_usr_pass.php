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

$sql = "SELECT kata_kunci_user FROM pengguna WHERE id_user='".$_GET['id']."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo $row["kata_kunci_user"];
  }
} else {
  echo "0 results";
}
$conn->close();
?> 