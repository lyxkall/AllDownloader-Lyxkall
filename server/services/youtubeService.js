const axios = require("axios");

const PURUBOY_VIDEO = "https://puruboy-api.vercel.app/api/downloader/youtube";
const PURUBOY_AUDIO = "https://puruboy-api.vercel.app/api/downloader/ytmp3";

const HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.youtube.com/",
};

async function fetchYouTube(url) {
  try {
    // Jalankan video & audio secara paralel
    const [videoResult, audioResult] = await Promise.allSettled([
      axios.post(PURUBOY_VIDEO, { url }, { headers: HEADERS, timeout: 20000 }),
      axios.post(PURUBOY_AUDIO, { url }, { headers: HEADERS, timeout: 20000 }),
    ]);

    const videoData = videoResult.status === "fulfilled" ? videoResult.value.data?.result : null;
    const audioData = audioResult.status === "fulfilled" ? audioResult.value.data?.result : null;

    if (!videoData?.downloadUrl) throw new Error("Gagal mengambil data video YouTube.");

    const downloads = [];

    // Video
    downloads.push({
      text: `Video MP4 ${videoData.quality || "HD"}${videoData.size ? ` (${videoData.size})` : ""}`.trim(),
      type: "video",
      url: videoData.downloadUrl,
    });

    // Audio — field-nya "download_url" (beda dengan video yang "downloadUrl")
    if (audioData?.download_url) {
      downloads.push({
        text: "Audio MP3",
        type: "audio",
        url: audioData.download_url,
      });
    }

    return {
      status: true,
      title: videoData.title || audioData?.title || "YouTube Video",
      thumbnail: videoData.thumbnail || null,
      quality: videoData.quality || "HD",
      size: videoData.size || null,
      downloads,
    };
  } catch (error) {
    console.error("[YouTube] Error:", error.message);

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      throw new Error("Tidak bisa terhubung ke API server.");
    }
    if (error.response?.status === 403) {
      throw new Error("API diblokir dari server ini (403).");
    }

    throw error;
  }
}

module.exports = { fetchYouTube };