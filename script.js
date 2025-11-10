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
        padding: 12px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

    #controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: #1b1f24;
    }

    select, button, input {
        background: #222831;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 8px 10px;
        font-size: 14px;
        margin: 0 5px;
    }

    button:hover, select:hover {
        background: #238636;
        cursor: pointer;
    }

    #search-bar {
        flex: 1;
    }

    #channel-list {
        list-style: none;
        padding: 10px;
        margin: 0;
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr;
        transition: all 0.3s;
    }

    #channel-list.grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    #channel-list li {
        padding: 10px;
        border: 1px solid #222;
        border-radius: 10px;
        text-align: center;
        background: #161b22;
        cursor: pointer;
        transition: 0.3s;
    }

    #channel-list li:hover {
        background: #1e232a;
        transform: scale(1.02);
    }

    #channel-list li.active {
        background: #238636;
        border-color: #2ea043;
    }

    #video-container {
        display: none;
        text-align: center;
        margin-top: 10px;
    }

    video {
        width: 95%;
        max-width: 800px;
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

<div id="controls">
    <select id="category-filter">
        <option value="all">📺 كل القنوات</option>
        <option value="bein">⚽ beIN SPORTS</option>
        <option value="movies">🎬 أفلام</option>
        <option value="kids">🧸 أطفال</option>
        <option value="news">📰 أخبار</option>
    </select>

    <input type="text" id="search-bar" placeholder="🔍 ابحث عن قناة...">
    <button id="toggle-view">🗂️ عرض الشبكة</button>
</div>

<ul id="channel-list"></ul>

<div id="video-container">
    <h3 id="current-channel-name"></h3>
    <video id="video-player" controls autoplay playsinline></video>
</div>

<script>
// تهيئة Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
}

// ملف M3U مختصر (يمكنك استبداله بمحتوى أكبر)
const m3uContent = `#EXTM3U
#EXTINF:-1,beIN SPORTS 1 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/46
#EXTINF:-1,beIN SPORTS 2 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/47
#EXTINF:-1,beIN MOVIES 1 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/24
#EXTINF:-1,beIN JUNIOR HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2947
#EXTINF:-1,beIN NEWS HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2051
`;

function parseM3U(content) {
    const lines = content.split('\n');
    const parsedChannels = [];
    let currentChannel = {};

    for (let line of lines) {
        line = line.trim();
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

function categorizeChannel(name) {
    name = name.toLowerCase();
    if (name.includes('bein sports')) return 'bein';
    if (name.includes('movie')) return 'movies';
    if (name.includes('junior') || name.includes('cartoon') || name.includes('kids')) return 'kids';
    if (name.includes('news')) return 'news';
    return 'other';
}

function displayChannels(list) {
    const container = document.getElementById('channel-list');
    container.innerHTML = '';
    list.forEach(ch => {
        const li = document.createElement('li');
        li.textContent = ch.name;
        li.dataset.url = ch.url;
        li.onclick = () => playChannel(ch.name, ch.url);
        container.appendChild(li);
    });
}

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
    } else {
        video.src = url;
        video.play().catch(err => console.error(err));
    }

    tg?.postEvent?.('iframe_resize');
}

function setupFilters() {
    const searchBar = document.getElementById('search-bar');
    const categorySelect = document.getElementById('category-filter');

    function filterChannels() {
        const term = searchBar.value.toLowerCase();
        const cat = categorySelect.value;
        const filtered = channels.filter(c => {
            const matchSearch = c.name.toLowerCase().includes(term);
            const matchCat = cat === 'all' || c.category === cat;
            return matchSearch && matchCat;
        });
        displayChannels(filtered);
    }

    searchBar.addEventListener('input', filterChannels);
    categorySelect.addEventListener('change', filterChannels);
}

function setupViewToggle() {
    const btn = document.getElementById('toggle-view');
    const list = document.getElementById('channel-list');
    let gridMode = false;

    btn.onclick = () => {
        gridMode = !gridMode;
        list.classList.toggle('grid', gridMode);
        btn.textContent = gridMode ? '📋 عرض القائمة' : '🗂️ عرض الشبكة';
    };
}

let channels = [];
document.addEventListener('DOMContentLoaded', () => {
    channels = parseM3U(m3uContent).map(c => ({
        ...c,
        category: categorizeChannel(c.name)
    }));
    displayChannels(channels);
    setupFilters();
    setupViewToggle();
});
</script>

</body>
</html>
