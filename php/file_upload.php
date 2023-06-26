<?php
$target_dir = "C:/xampp/HTDOCS/img/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;

  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo htmlspecialchars( basename( $_FILES["fileToUpload"]["name"]));
  } else {
    echo "error";
  }

?>