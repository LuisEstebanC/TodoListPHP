<?php 

    include('database.php');
    $id = $_POST['id'];
    $query = "SELECT * FROM todos WHERE id =$id";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Query failed');
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'title' => $row['title'],
            'description' =>$row['description'],
            'id' => $row['id']
        );
    }

    $jsonstring = json_encode($json[0]);
    echo $jsonstring;



?>