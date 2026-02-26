const axios = require("axios");

async function fetchTikTok(url) {
  try {
    const cleanUrl = url.split('?')[0];
    const response = await axios.post('https://www.puruboy.kozow.com/api/downloader/tiktok-v2', 
    { "url": cleanUrl }, 
    { 
      headers: { 
        'Content-Type': 'application/json',
        // Ini kuncinya: Nyamar jadi Chrome Windows
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/' 
      } 
    });

    const res = response.data;
    if (!res?.result) throw new Error("API TikTok Gagal.");

    const data = res.result;
    return {
      status: true,
      title: data.title || "TikTok Video",
      // Tambahin &n=1 buat maksa refresh thumbnail yang tadinya pecah/mati
      thumbnail: `https://wsrv.nl/?url=${encodeURIComponent(data.thumbnail)}&output=jpg&n=1`,
      downloads: (data.downloads || []).map(d => ({ text: d.type, url: d.url }))
    };
  } catch (error) {
    console.error("TikTok Vercel Error:", error.message);
    throw error;
  }
}
module.exports = { fetchTikTok };