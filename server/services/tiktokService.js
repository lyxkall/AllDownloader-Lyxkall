const axios = require("axios");

async function fetchTikTok(url) {
  try {
    // Memastikan link bersih dari parameter ?is_from_webapp=1 dsb.
    const urlObj = new URL(url);
    const cleanUrl = `${urlObj.origin}${urlObj.pathname}`;
    
    console.log(`[TIKTOK] Mengirim URL bersih: ${cleanUrl}`);

    const response = await axios.post('https://www.puruboy.kozow.com/api/downloader/tiktok-v2', {
      "url": cleanUrl 
    }, { headers: { 'Content-Type': 'application/json' } });

    const data = response.data.result;
    if (!data) throw new Error("Data tidak ditemukan");

    return {
      status: true,
      title: data.title || "TikTok Video",
      // Tambahkan referer kosong pada proxy wsrv agar TikTok tidak memblokir
      thumbnail: `https://wsrv.nl/?url=${encodeURIComponent(data.thumbnail)}&output=jpg&we&n=-1`,
      author: data.author || "TikTok User",
      downloads: data.downloads.map(item => ({
        text: item.type,
        url: item.url
      }))
    };
  } catch (error) {
    console.error("TikTok Error:", error.message);
    throw error;
  }
}
module.exports = { fetchTikTok };