const axios = require("axios");

const PURUBOY_API = "https://www.puruboy.kozow.com/api/downloader/tiktok-v2";

async function fetchTikTok(url) {
  try {
    const cleanUrl = url.split("?")[0];

    const response = await axios.post(
      PURUBOY_API,
      { url: cleanUrl },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: "https://www.tiktok.com/",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "sec-ch-ua": '"Chromium";v="120", "Google Chrome";v="120"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        },
        timeout: 20000,
      }
    );

    const res = response.data;
    if (!res?.result) throw new Error("API TikTok Gagal.");

    const data = res.result;

    // Map downloads dengan label yang lebih jelas
    const downloads = (data.downloads || []).map((d) => {
      const type = (d.type || "").toLowerCase();
      let quality = d.type;
      let fileType = "video";

      if (type.includes("mp3")) {
        quality = "Audio MP3";
        fileType = "audio";
      } else if (type.includes("hd")) {
        quality = "HD (No Watermark)";
        fileType = "video";
      } else if (type.includes("[1]")) {
        quality = "SD (No Watermark)";
        fileType = "video";
      } else if (type.includes("[2]")) {
        quality = "SD Direct";
        fileType = "video";
      }

      return { text: quality, type: fileType, url: d.url };
    });
    
    // Ekstrak video ID dari URL TikTok
    const videoId = url.split("/video/")[1]?.split("?")[0] || null;

    // Generate thumbnail dari video ID
    const thumbnail = videoId
      ? `https://www.tiktok.com/api/img/?itemId=${videoId}&location=0`
      : null;

    return {
      status: true,
      title: data.title || "TikTok Video",
      thumbnail,
      author: "Lyxkall",
      downloads,
    };
  } catch (error) {
    console.error("TikTok Error:", error.message);

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      throw new Error("Tidak bisa terhubung ke API server. Coba lagi nanti.");
    }
    if (error.response?.status === 403) {
      throw new Error("API diblokir dari server ini (403 Forbidden).");
    }
    if (error.response?.status === 429) {
      throw new Error("Terlalu banyak request, coba lagi dalam beberapa detik.");
    }

    throw error;
  }
}

module.exports = { fetchTikTok };