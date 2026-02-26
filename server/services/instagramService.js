const axios = require("axios");

async function fetchInstagram(url) {
  try {
    // 1. Bersihkan URL Instagram dari parameter tracking/ads
    const urlObj = new URL(url);
    const cleanUrl = `${urlObj.origin}${urlObj.pathname}`;
    
    console.log(`[IG SERVICE] Memproses URL: ${cleanUrl}`);

    // 2. Tembak API Puruboy Instagram
    const response = await axios.post('https://www.puruboy.kozow.com/api/downloader/instagram', {
      "url": cleanUrl
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const res = response.data;

    // 3. Validasi Respon (Mengikuti pola .result seperti YouTube)
    if (!res || !res.result) {
      console.log("[DEBUG IG] Respon Gagal:", res);
      throw new Error("API Instagram tidak memberikan data. Pastikan akun tidak privat.");
    }

    const data = res.result;

    // 4. Susun format data untuk UI
    // API IG biasanya memberikan array 'url' atau langsung 'downloadUrl'
    const downloads = [];
    
    if (Array.isArray(data)) {
      // Jika hasilnya carousel (banyak foto/video)
      data.forEach((item, index) => {
        downloads.push({
          text: `Download Media ${index + 1}`,
          url: item.url || item.downloadUrl
        });
      });
    } else if (data.downloadUrl || data.url) {
      // Jika hasilnya single post/video
      downloads.push({
        text: "Download Media (HD)",
        url: data.downloadUrl || data.url
      });
    }

    return {
      status: true,
      title: data.title || "Instagram Post",
      thumbnail: data.thumbnail || (Array.isArray(data) ? data[0].thumbnail : ""),
      downloads: downloads
    };

  } catch (error) {
    console.error("Instagram Service Error:", error.message);
    throw new Error(error.message);
  }
}

module.exports = { fetchInstagram };