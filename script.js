// تهيئة مكتبة Telegram Web App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand(); // توسيع التطبيق لملء الشاشة

// قائمة القنوات (سيتم ملؤها من ملف M3U)
let channels = [];

// محتوى ملف M3U الذي تم تحليله مسبقاً
// سنستخدم محتوى الملف الذي أرسلته أنت
const m3uContent = `
#EXTM3U

#EXTINF:-1,beIN SPORTS Full HD 1
http://front-main.eagle-4k.me:80/live/9fshhuw2z7/54hw7lwwb1/196816.m3u8#EXTINF:-1,beIN SPORTS Full HD 2
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3222
#EXTINF:-1,beIN SPORTS Full HD 3
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3224
#EXTINF:-1,beIN SPORTS Full HD 4
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3225
#EXTINF:-1,beIN SPORTS Full HD 5
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3226
#EXTINF:-1,beIN SPORTS Full HD 6
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3227
#EXTINF:-1,beIN SPORTS Full HD 7
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3228
#EXTINF:-1,beIN SPORTS Full HD 8
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3230
#EXTINF:-1,beIN SPORTS Full HD 9
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/4033
#EXTINF:-1,•●★★--- beIN SPORTS [HVEC_H265] ---★★●•
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3703
#EXTINF:-1,beIN SPORTS 1 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/459
#EXTINF:-1,beIN SPORTS 2 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/450
#EXTINF:-1,beIN SPORTS 3 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/451
#EXTINF:-1,beIN SPORTS 4 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/453
#EXTINF:-1,beIN SPORTS 5 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3875
#EXTINF:-1,beIN SPORTS 6 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/455
#EXTINF:-1,beIN SPORTS 7 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/4002
#EXTINF:-1,beIN SPORTS 8 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/457
#EXTINF:-1,beIN SPORTS 9 [H265]
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/4003
#EXTINF:-1,•●★★--- beIN SPORTS ᴴᴰ ---★★●•
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/117
#EXTINF:-1,beIN SPORTS News
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2051
#EXTINF:-1,beIN SPORTS 1 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/46
#EXTINF:-1,beIN SPORTS 2 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/47
#EXTINF:-1,beIN SPORTS 3 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/49
#EXTINF:-1,beIN SPORTS 4 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/50
#EXTINF:-1,beIN SPORTS 5 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/51
#EXTINF:-1,beIN SPORTS 6 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/52
#EXTINF:-1,beIN SPORTS 7 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/53
#EXTINF:-1,beIN SPORTS 8 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/54
#EXTINF:-1,beIN SPORTS 9 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/4034
#EXTINF:-1,beIN SPORTS XTRA 1 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/4095
#EXTINF:-1,beIN SPORTS XTRA 2 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/4096
#EXTINF:-1,beIN SPORTS FRENCH 1 ᴴᴰ
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3972
#EXTINF:-1,beIN SPORTS NBA
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3973
#EXTINF:-1,•●★★--- beIN SPORTS SD ---★★●•
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2873
#EXTINF:-1,beIN SPORTS 1 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/56
#EXTINF:-1,beIN SPORTS 2 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/57
#EXTINF:-1,beIN SPORTS 3 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/59
#EXTINF:-1,beIN SPORTS 4 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/60
#EXTINF:-1,beIN SPORTS 5 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/93
#EXTINF:-1,beIN SPORTS 6 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/92
#EXTINF:-1,beIN SPORTS 7 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/91
#EXTINF:-1,beIN SPORTS 8 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/61
#EXTINF:-1,beIN SPORTS 9 SD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/4035
#EXTINF:-1,•●★★--- beIN Entertainment ---★★●•
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/121
#EXTINF:-1,AR: beIN Movies 1 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/24
#EXTINF:-1,AR: beIN Movies 2 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/17
#EXTINF:-1,AR: beIN Movies 3 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/18
#EXTINF:-1,AR: beIN Movies 4 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/19
#EXTINF:-1,AR: beIN Series 1 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/20
#EXTINF:-1,AR: beIN Series 2 HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/21
#EXTINF:-1,AR: beIN Drama
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/15
#EXTINF:-1,AR: beIN Outdoor
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/13
#EXTINF:-1,AR: beIN AMC
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/14
#EXTINF:-1,AR: beIN Jeem HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/22
#EXTINF:-1,AR: beIN FATAFEAT HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/25
#EXTINF:-1,AR: beIN Gourmet
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/947
#EXTINF:-1,AR: beIN Baraeem
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2028
#EXTINF:-1,AR: beIN JUNIOR HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2947
#EXTINF:-1,AR: beIN DREAMWORKS HD
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2948
#EXTINF:-1,AR:Cartoon Network Arabic
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/2949
#EXTINF:-1,AR: beIN BOXOFFICE HD1
http://ugeen.live:8080/Ugeen_VIP8Z9E57/jueFRN/3276
`;

/**
 * دالة لتحليل محتوى M3U واستخراج القنوات
 * @param {string} content - محتوى ملف M3U
 * @returns {Array<Object>} قائمة بالكائنات {name, url}
 */
function parseM3U(content) {
    const lines = content.split('\n');
    const parsedChannels = [];
    let currentChannel = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('#EXTINF:')) {
            // استخراج اسم القناة
            const match = line.match(/,(.*)/);
            if (match && match[1]) {
                currentChannel.name = match[1].trim();
            }
        } else if (line.startsWith('http')) {
            // استخراج رابط البث
            currentChannel.url = line;
            if (currentChannel.name && currentChannel.url) {
                parsedChannels.push(currentChannel);
            }
            currentChannel = {}; // إعادة تعيين للكائن التالي
        }
    }
    return parsedChannels;
}

/**
 * دالة لعرض قائمة القنوات في الواجهة
 * @param {Array<Object>} channelList - قائمة القنوات
 */
function displayChannels(channelList) {
    const listElement = document.getElementById('channel-list');
    listElement.innerHTML = ''; // مسح القائمة القديمة

    channelList.forEach(channel => {
        const listItem = document.createElement('li');
        listItem.textContent = channel.name;
        listItem.dataset.url = channel.url;
        listItem.addEventListener('click', () => playChannel(channel.name, channel.url));
        listElement.appendChild(listItem);
    });
}

/**
 * دالة لتشغيل القناة المختارة
 * @param {string} name - اسم القناة
 * @param {string} url - رابط البث
 */
function playChannel(name, url) {
    const videoContainer = document.getElementById('video-container');
    const videoElement = document.getElementById('video-player');
    const channelNameElement = document.getElementById('current-channel-name');
    const listItems = document.querySelectorAll('#channel-list li');

    // إظهار مشغل الفيديو
    videoContainer.style.display = 'block';
    channelNameElement.textContent = name;

    // إزالة التحديد من القنوات الأخرى وتحديد القناة الحالية
    listItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`li[data-url="${url}"]`).classList.add('active');

    // إيقاف أي تشغيل سابق
    videoElement.pause();
    videoElement.removeAttribute('src');
    videoElement.load();

    // محاولة تشغيل الرابط باستخدام HLS.js إذا كان الرابط HLS
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            videoElement.play().catch(e => {
                console.error('HLS Playback Error:', e);
                channelNameElement.textContent = `فشل تشغيل القناة: ${name}. (خطأ في التشغيل التلقائي أو الرابط)`;
            });
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                console.error('HLS Fatal Error:', data.details);
                // محاولة التشغيل المباشر إذا فشل HLS
                videoElement.src = url;
                videoElement.play().catch(e => {
                    console.error('Direct Playback Error:', e);
                    channelNameElement.textContent = `فشل تشغيل القناة: ${name}. (الرابط غير صالح أو غير مدعوم)`;
                });
            }
        });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // دعم أصلي لـ HLS (مثل Safari)
        videoElement.src = url;
        videoElement.addEventListener('loadedmetadata', function() {
            videoElement.play().catch(e => {
                console.error('Native Playback Error:', e);
                channelNameElement.textContent = `فشل تشغيل القناة: ${name}. (خطأ في التشغيل التلقائي أو الرابط)`;
            });
        });
    } else {
        // محاولة التشغيل المباشر
        videoElement.src = url;
        videoElement.play().catch(e => {
            console.error('Direct Playback Error:', e);
            channelNameElement.textContent = `فشل تشغيل القناة: ${name}. (الرابط غير صالح أو غير مدعوم)`;
        });
    }

    // إرسال إشارة لتيليجرام لتغيير حجم الواجهة
    tg.postEvent('iframe_resize');
}

/**
 * دالة البحث
 */
function setupSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredChannels = channels.filter(channel =>
            channel.name.toLowerCase().includes(searchTerm)
        );
        displayChannels(filteredChannels);
    });
}

// نقطة البداية
document.addEventListener('DOMContentLoaded', () => {
    channels = parseM3U(m3uContent);
    displayChannels(channels);
    setupSearch();
});
