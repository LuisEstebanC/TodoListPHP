<?php 

    include('database.php');

    $query = 'SELECT * FROM todos';
    $result = mysqli_query($connection, $query);

    if(!$result) {
        die('Query failed' . mysqli_error($connection));
    }

    while($row = mysqli_fetch_array($result)){
        $json[] = array(  
            'title' => $row['title'],
            'description' => $row['description'],
            'id' => $row['id']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

?>