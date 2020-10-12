<?php
include 'config_file.php';
$message ='';

$conn =new mysqli($host_name,$host_user,$host_password,$database_name);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$id = $_GET['id'];
	 
	
$Sql_Query = "INSERT INTO basket(product_id,amount) VALUES($id,1)";
	 
if(mysqli_query($conn,$Sql_Query)){
	 
			 // If the record inserted successfully then show the message as response. 
		$MSG = 'เพิ่มในตะกล้าเรียบร้อยแล้ว' ;
			 
			// Converting the message into JSON format.
		$json = json_encode($MSG);
			 
			// Echo the message on screen.
			// We would also show this message on our app.
		echo $json ;
	 
	 }
	 else{
	 
			echo 'Something Went Wrong';
	 
	 }
mysqli_close($conn);
	
?>