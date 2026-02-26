const axios = require("axios");

async function fetchYouTube(url) {
  try {
    const config = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    const [vRes, aRes] = await Promise.allSettled([
      axios.post('https://www.puruboy.kozow.com/api/downloader/youtube', { "url": url }, config),
      axios.post('https://www.puruboy.kozow.com/api/downloader/ytmp3', { "url": url }, config)
    ]);

    const vData = vRes.status === 'fulfilled' ? vRes.value.data.result : null;
    const aData = aRes.status === 'fulfilled' ? aRes.value.data.result : null;

    const downloads = [];
    if (vData?.downloadUrl) downloads.push({ text: "Video MP4", url: vData.downloadUrl });
    if (aData?.downloadUrl) downloads.push({ text: "Audio MP3", url: aData.downloadUrl });

    return {
      status: true,
      title: vData?.title || aData?.title || "YouTube Media",
      thumbnail: vData?.thumbnail || aData?.thumbnail || "",
      downloads: downloads
    };
  } catch (error) {
    throw error;
  }
}
module.exports = { fetchYouTube };