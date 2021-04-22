<?php 

    include('database.php');

    $id = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];

    $query = "UPDATE todos SET title = '$title', description = '$description' WHERE id = '$id'";

    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Query Field.');
    }

    echo 'Update todo seccessfully';
?>