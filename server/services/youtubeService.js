const axios = require("axios");

async function fetchYouTube(url) {
  try {
    console.log(`[YT SERVICE] Memproses URL: ${url}`);

    const response = await axios.post('https://www.puruboy.kozow.com/api/downloader/youtube', {
      "url": url
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const result = response.data;

    // --- PERBAIKAN DI SINI ---
    // Sesuai log terminalmu, datanya ada di dalam 'result' (huruf kecil), bukan 'data'
    if (!result || !result.result) {
      console.log("[DEBUG YT] Struktur salah atau gagal:", JSON.stringify(result));
      throw new Error("API Puruboy tidak memberikan data valid.");
    }

    const ytData = result.result; // Mengambil objek 'result'

    return {
      status: true,
      title: ytData.title || "YouTube Video",
      thumbnail: ytData.thumbnail ? `https://wsrv.nl/?url=${encodeURIComponent(ytData.thumbnail)}&output=jpg` : "",
      author: result.author || "PuruBoy",
      downloads: [
        { 
          text: `Download Video (${ytData.quality || 'HD'})`, 
          url: ytData.downloadUrl 
        },
        // Tombol MP3 hanya akan muncul jika API memberikan key 'audioUrl' atau sejenisnya
        ytData.audioUrl ? { 
          text: "Download Audio (MP3)", 
          url: ytData.audioUrl 
        } : null
      ].filter(item => item !== null && item.url) // Membersihkan item yang kosong
    };

  } catch (error) {
    console.error("YouTube Service Error:", error.message);
    throw new Error(error.message);
  }
}

module.exports = { fetchYouTube };