<?php
// video/speed.php
$data = json_decode(file_get_contents('php://input'), true);
$speed = $data['speed'];
file_put_contents('log.txt', "Speed selected: $speed\n", FILE_APPEND);

// video/quality.php
$data = json_decode(file_get_contents('php://input'), true);
$quality = $data['quality'];
file_put_contents('log.txt', "Quality selected: $quality\n", FILE_APPEND);