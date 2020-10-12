<?php
include 'config_file.php';
$message ='';

$conn =new mysqli($host_name,$host_user,$host_password,$database_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$start = $_GET['start'];
$end = $_GET['end'];
$id = $_GET['id'];

$arr = array();

$sql = "SELECT * FROM product_treatment pt join product p on pt.product_id = p.product_id where skinproblems_id = $id order by p.product_id LIMIT $start, $end"; 
$result_set = mysqli_query($conn, $sql);
while ($result = mysqli_fetch_array($result_set)) {
    array_push($arr, $result);
}
$responseJson = json_encode($arr);
echo $responseJson;

$conn->close();