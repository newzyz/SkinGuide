<?php
include 'config_file.php';
$message ='';

$conn =new mysqli($host_name,$host_user,$host_password,$database_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_GET['id'];


$arr = array();

$sql = " DELETE FROM basket WHERE idbasket = $id"; 
$result_set = mysqli_query($conn, $sql);
while ($result = mysqli_fetch_array($result_set)) {
    array_push($arr, $result);
}
$responseJson = json_encode($arr);
echo $responseJson;

$conn->close();