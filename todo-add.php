<?php 

    include('database.php');

    if(isset($_POST['title'])){
        $title = $_POST['title'];
        $description = $_POST['description'];
        //$id = uniqid('todo');
        
        $query = "INSERT INTO todos (  title, description)
         VALUES (  '$title', '$description')";
        $result = mysqli_query($connection, $query);
        if(!$result) {
            die('Query Failed.');
        }
        echo 'todo added successfully';
    }

?>