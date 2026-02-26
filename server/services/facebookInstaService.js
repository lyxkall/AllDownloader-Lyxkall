const axios = require("axios");

async function fetchFacebook(url) {
  try {
    // 1. Bersihkan URL (Hapus parameter fbwatch atau tracking fbclid)
    const urlObj = new URL(url);
    const cleanUrl = `${urlObj.origin}${urlObj.pathname}`;
    
    console.log(`[FB SERVICE] Memproses URL: ${cleanUrl}`);

    // 2. Request ke API Puruboy Facebook
    const response = await axios.post('https://www.puruboy.kozow.com/api/downloader/fbdl', {
      "url": cleanUrl
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const res = response.data;

    // 3. Validasi struktur data (Biasanya ada di dalam 'result')
    if (!res || !res.result) {
      console.log("[DEBUG FB] Respon Gagal:", res);
      throw new Error("API Facebook tidak memberikan data. Pastikan link video publik.");
    }

    const data = res.result;

    // 4. Susun daftar download (Biasanya ada pilihan SD dan HD)
    const downloads = [];
    
    // Kadang API FB memberikan 'hd' dan 'sd' secara terpisah
    if (data.hd) downloads.push({ text: "Video HD Quality", url: data.hd });
    if (data.sd) downloads.push({ text: "Video SD Quality", url: data.sd });
    
    // Jika hanya ada satu link downloadUrl
    if (downloads.length === 0 && (data.downloadUrl || data.url)) {
      downloads.push({ text: "Download Video", url: data.downloadUrl || data.url });
    }

    return {
      status: true,
      title: data.title || "Facebook Video",
      // Gunakan proxy wsrv lagi karena FB juga sering memblokir hotlink gambar
      thumbnail: data.thumbnail ? `https://wsrv.nl/?url=${encodeURIComponent(data.thumbnail)}&output=jpg` : "",
      downloads: downloads
    };

  } catch (error) {
    console.error("Facebook Service Error:", error.message);
    throw new Error(error.message);
  }
}

module.exports = { fetchFacebook };