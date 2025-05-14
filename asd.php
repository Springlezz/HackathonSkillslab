<?php
// Путь к видеофайлу
$choose = 4;
$inputFile = 'video.mp4';
$outputFile1 = 'video_480p.mp4';
$outputFile2 = 'video_720p.mp4';
$outputFile3 = 'video_1080p.mp4';
$outputFile4 = 'video_4000p.mp4';
$outputFile = 'output/out.m3u8';

// Команда FFmpeg для изменения качества
$command_480 = "ffmpeg -i $inputFile -vf scale=1280:480 -c:a aac -strict experimental $outputFile1";
$command_720 = "ffmpeg -i $inputFile -vf scale=1280:720 -c:a aac -strict experimental $outputFile2";
$command_1080 = "ffmpeg -i $inputFile -vf scale=1280:1080 -c:a aac -strict experimental $outputFile3";
$command_4000 = "ffmpeg -i $inputFile -vf scale=4000:4000 -c:a aac -strict experimental $outputFile4";


$output = '';
// Выполнение команды
if ($choose == 1){
    $output = shell_exec($command_480);
    echo $output;
    $command = "ffmpeg -i $outputFile1 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls $outputFile";
    $output = shell_exec($command);
    echo $output;
}
if ($choose == 2){
    $output = shell_exec($command_720);
    echo $output;
    $command = "ffmpeg -i $outputFile2 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls $outputFile";
    $output = shell_exec($command);
    echo $output;
}
if ($choose == 3){
    $output = shell_exec($command_1080);
    echo $output;
    $command = "ffmpeg -i $outputFile3 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls $outputFile";
    $output = shell_exec($command);
    echo $output;
}
if ($choose == 4){
    $output = shell_exec($command_4000);
    echo $output;
    $command = "ffmpeg -i $outputFile4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls $outputFile";
    $output = shell_exec($command);
    echo $output;
}




// Печать вывода
