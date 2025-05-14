<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$filename = 'video1.mp4';
$path = __DIR__ . "/videos/$filename";

$cachedSize = $redis->get("video:$filename:size");
if (!$cachedSize) {
    $size = filesize($path);
    $redis->set("video:$filename:size", $size, 3600); 
} else {
    $size = $cachedSize;
}
echo "Video size: $size";