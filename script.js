<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>مشغل القنوات</title>
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<style>
    body {
        font-family: "Cairo", sans-serif;
        background: #0d1117;
        color: #fff;
        margin: 0;
        padding: 0;
        direction: rtl;
    }
    header {
        background: #161b22;
        padding: 10px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
    #search-bar {
        width: 90%;
        margin: 10px auto;
        padding: 10px;
        border-radius: 10px;
        border: none;
        display: block;
        font-size: 16px;
    }
    #channel-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 300px;
        overflow-y: auto;
        background: #161b22;
        border-top: 1px solid #222;
    }
    #channel-list li {
        padding: 12px;
        border-bottom: 1px solid #222;
        cursor: pointer;
        transition: background 0.3s;
    }
    #channel-list li:hover {
        background: #1e232a;
    }
    #channel-list li.active {
        background: #238636;
    }
    #video-container {
        display: none;
        margin-top: 10px;
        text-align: center;
    }
    video {
        width: 95%;
        max-width: 800px;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 0 10px #000;
    }
    #current-channel-name {
        margin: 10px 0;
        font-weight: bold;
    }
</style>
</head>
<body>

<header>🎥 مشغل قنوات M3U</header>

<input type="text" id="search-bar" placeholder="🔍 ابحث عن قناة...">

<ul id="channel-list"></ul>

<div id="video-container">
    <h3 id="current-channel-name"></h3>
    <video id="video-player" controls autoplay playsinline></video>
</div>

<script>
// تهيئة مكتبة Telegram Web App
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
}

// محتوى ملف M3U
const m3uContent = `#EXTM3U
#EXTINF:-1,beIN SPORTS Full HD 1
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3221
#EXTINF:-1,beIN SPORTS Full HD 2
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3222
#EXTINF:-1,beIN SPORTS Full HD 3
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3224
`;

// تحليل ملف M3U
function parseM3U(content) {
    const lines = content.split('\n');
    const parsedChannels = [];
    let currentChannel = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF:')) {
            const match = line.match(/,(.*)/);
            if (match && match[1]) currentChannel.name = match[1].trim();
        } else if (line.startsWith('http')) {
            currentChannel.url = line;
            if (currentChannel.name && currentChannel.url) parsedChannels.push(currentChannel);
            currentChannel = {};
        }
    }
    return parsedChannels;
}

// عرض القنوات
function displayChannels(channelList) {
    const listElement = document.getElementById('channel-list');
    listElement.innerHTML = '';
    channelList.forEach(channel => {
        const li = document.createElement('li');
        li.textContent = channel.name;
        li.dataset.url = channel.url;
        li.onclick = () => playChannel(channel.name, channel.url);
        listElement.appendChild(li);
    });
}

// تشغيل القناة
function playChannel(name, url) {
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('video-player');
    const channelName = document.getElementById('current-channel-name');
    const listItems = document.querySelectorAll('#channel-list li');

    videoContainer.style.display = 'block';
    channelName.textContent = name;

    listItems.forEach(li => li.classList.remove('active'));
    document.querySelector(`li[data-url="${url}"]`)?.classList.add('active');

    video.pause();
    video.removeAttribute('src');
    video.load();

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                console.error('HLS Error:', data);
                video.src = url;
                video.play().catch(err => console.error(err));
            }
        });
    } else {
        video.src = url;
        video.play().catch(err => console.error(err));
    }

    tg?.postEvent?.('iframe_resize');
}

// بحث مباشر
function setupSearch() {
    const search = document.getElementById('search-bar');
    search.addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        const filtered = channels.filter(c => c.name.toLowerCase().includes(term));
        displayChannels(filtered);
    });
}

// بدء التطبيق
let channels = [];
document.addEventListener('DOMContentLoaded', () => {
    channels = parseM3U(m3uContent);
    displayChannels(channels);
    setupSearch();
});
</script>

</body>
</html>
