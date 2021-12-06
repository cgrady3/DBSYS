<?php
    // include database connection file
    include "dbConfig.php";
    include "returnFunctions.php";

    $inData = getRequestInfo();

    $stmt = $conn->prepare("SELECT * FROM faculty WHERE email=?");
    $stmt->bind_param("s", $inData["email"]);
    $stmt->execute();

    $result = $stmt->get_result();
    $num = $stmt->affected_rows;

    if ($num == 0){
        $stmt = $conn->prepare("UPDATE faculty SET email=? WHERE fid=?");
        $stmt->bind_param("ss", $inData["email"], $inData["fid"]);

        $stmt->execute();

        echo json_encode($stmt->affected_rows);
    } else {
        echo json_encode(-1);
    }
    $stmt->close();
    $conn->close();
?>
