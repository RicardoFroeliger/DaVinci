<?php
    function executeQuery($query, $params = [], $lastId = false) {
        $connection = new PDO('mysql:host=localhost;dbname=characters;', 'root', 'mysql');

        $data = $connection->prepare($query);
        $data ->execute($params);
        $data = $data->fetchAll();

        $last_id = $connection->lastInsertId();
        $connection = null;

        return $lastId ? [$data, $last_id] : $data;
    }

    function sanitize($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function getAll($table) {
        return executeQuery("SELECT * FROM $table ORDER BY name");
    }

    function getOne($table, $id) {
        return executeQuery(
            "SELECT * FROM $table WHERE id=:id",
            [':id' => sanitize($id)]
        )[0];         
    }

    function updateLocation($loc, $id) {
        executeQuery(
            'UPDATE characters SET location=:loc WHERE id=:id',
            [':loc' => sanitize($loc), ':id' => sanitize($id)]
        );
    }

    function AddLocation($loc) {
        return executeQuery(
            'INSERT INTO locations(name) VALUES(:loc)',
            [':loc' => sanitize($loc)], true
        )[1];
    }
    
    function deleteLocation($loc) {
        executeQuery(
            "DELETE FROM locations WHERE id=:loc",
            [':loc' => $loc]
        );
    }
?>