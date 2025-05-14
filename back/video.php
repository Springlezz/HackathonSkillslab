<?php

$filename = $_GET['file'] ?? 'video.mp4';
$path = __DIR__ . "/videos/" . basename($filename);

if (!file_exists($path)) {
    http_response_code(404);
    exit("File not found");
}

$size = filesize($path);
$start = 0;
$end = $size - 1;

// Обработка Range-запросов
if (isset($_SERVER['HTTP_RANGE'])) {
    if (preg_match('/bytes=(\d+)-(\d*)/', $_SERVER['HTTP_RANGE'], $matches)) {
        $start = intval($matches[1]);
        if (!empty($matches[2])) {
            $end = intval($matches[2]);
        }
    }
    http_response_code(206);
} else {
    http_response_code(200);
}

$length = $end - $start + 1;

// Заголовки
header("Content-Type: video/mp4");
header("Content-Length: $length");
header("Accept-Ranges: bytes");
if (isset($_SERVER['HTTP_RANGE'])) {
    header("Content-Range: bytes $start-$end/$size");
}

// Потоковая передача
$fp = fopen($path, 'rb');
fseek($fp, $start);

$buffer = 1024 * 8;
while (!feof($fp) && $length > 0) {
    $read = ($length > $buffer) ? $buffer : $length;
    echo fread($fp, $read);
    flush();
    $length -= $read;
}
fclose($fp);