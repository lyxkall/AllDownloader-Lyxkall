const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// --- IMPORT SERVICE YANG AKTIF ---
const services = {
    tiktok: require('./services/tiktokService'),
    youtube: require('./services/youtubeService'),
    // snapchat: require('./services/snapchatService'),
    // twitter: require('./services/twitterService'),
    spotify: require('./services/spotifyService'),
    instagram: require('./services/instagramService'),
    facebook: require('./services/facebookService'),
    // soundcloud: require('./services/soundcloudService'),
    // linkedin: require('./services/linkedinService'),
    pinterest: require('./services/pinterestService'),
    // tumblr: require('./services/tumblrService'),
    douyin: require('./services/douyinService'),
    // kuaishou: require('./services/kuaishouService'),
    capcut: require('./services/capcutService'),
    // dailymotion: require('./services/dailymotionService'),
    // bluesky: require('./services/blueskyService'),
    
    // Facebook, Reddit, Threads sudah dihapus sesuai permintaan
};

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// --- ROUTE UNIVERSAL (OTOMATIS) ---
app.post('/api/:platform', async (req, res) => {
    const { platform } = req.params; 
    const { url } = req.body;

    console.log(`[SERVER] Request masuk ke: ${platform}`);

    // 1. Cek Service
    const serviceModule = services[platform];
    if (!serviceModule) {
        console.log(`[ERROR] Service '${platform}' tidak ditemukan/belum aktif.`);
        return res.status(404).json({ error: `Service '${platform}' belum tersedia di server.` });
    }

    try {
        // 2. Cari Fungsi Fetch (Otomatis)
        const functionName = Object.keys(serviceModule).find(key => typeof serviceModule[key] === 'function');

        if (!functionName) {
            throw new Error(`Tidak ada fungsi export di file ${platform}Service.js`);
        }

        console.log(`[SERVER] Menjalankan fungsi '${functionName}'...`);
        
        // 3. Eksekusi
        const data = await serviceModule[functionName](url);
        res.json(data);

    } catch (error) {
        console.error(`[ERROR]`, error.message);
        // Kirim detail error ke frontend agar muncul di alert
        res.status(500).json({ error: "Gagal memproses.", details: error.message });
    }
});

// Cek Status Server
app.get('/', (req, res) => {
    res.send('ZERONAUT ENGINE READY 🚀');
});

// --- PENTING: KONFIGURASI PORT ---
// Kode ini memastikan app.listen HANYA jalan di Localhost.
// Di Vercel, app.listen tidak boleh dijalankan secara langsung.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`>> SERVER NYALA DI: http://localhost:${PORT}`);
    });
}

// WAJIB: Export app agar bisa dibaca oleh api/index.js
module.exports = app;