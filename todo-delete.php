<?php 

    include('database.php'); 

    if(isset($_POST['id'])){

        $id = $_POST['id'];

        $query = "DELETE FROM todos WHERE id = $id";
        $result = mysqli_query($connection, $query);
        if(!$result) {
            die('Query failed' . mysqli_error($connection));
        }
        echo 'Todo deleted successfully';

    }

?>