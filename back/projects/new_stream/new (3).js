const video = document.getElementById('videoPlayer');
const speedSelector = document.getElementById('speedSelector');
const qualitySelector = document.getElementById('qualitySelector');

// Смена скорости воспроизведения
speedSelector.addEventListener('change', () => {
  const speed = parseFloat(speedSelector.value);
  video.playbackRate = speed;

  // Отправка инфо о скорости на сервер
  fetch('/api/video/speed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ speed })
  });
});

// Смена качества видео
qualitySelector.addEventListener('change', () => {
  const selectedQuality = qualitySelector.value;
  const sources = {
    '720p': 'video_720p.mp4',
    '1080p': 'video_1080p.mp4',
    '4k': 'video_4k.mp4'
  };

  const currentTime = video.currentTime;
  video.src = sources[selectedQuality];
  video.load();
  video.currentTime = currentTime;
  video.play();

  // Отправка инфо о выборе качества
  fetch('/api/video/quality', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quality: selectedQuality })
  });
});

async function getDownloadSpeedMbps() {
  const imageUrl = "https://via.placeholder.com/1000x1000.png";
  const startTime = new Date().getTime();
  const response = await fetch(imageUrl + '?cache=' + Math.random());
  const blob = await response.blob();
  const endTime = new Date().getTime();

  const duration = (endTime - startTime) / 1000;
  const bitsLoaded = blob.size * 8;
  const speedMbps = (bitsLoaded / duration / (1024 * 1024)).toFixed(2);

  console.log(`Примерная скорость загрузки: ${speedMbps} Mbps`);
  return parseFloat(speedMbps);
}

getDownloadSpeedMbps().then(speed => {
  if (speed < 3) hls.currentLevel = 0;      // 480p
  else if (speed < 6) hls.currentLevel = 1; // 720p
  else hls.currentLevel = 2;                // 1080p или выше
});