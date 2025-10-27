import express from 'express';

const app = express();

// Validasi environment variable dari Koyeb dashboard
const COOKIE_HEADER = process.env.YT_COOKIE;
if (!COOKIE_HEADER) {
  console.error('❌ Error: YT_COOKIE environment variable is required');
  console.error('Set it from Koyeb dashboard: Settings > Environment variables');
  process.exit(1);
}

// Sanitasi input video ID
function isValidVideoId(id) {
  return /^[a-zA-Z0-9_-]{8,16}$/.test(id);
}

app.get('/live/:id', async (req, res) => {
  const videoID = req.params.id.split('.')[0];

  if (!isValidVideoId(videoID)) {
    return res.status(400).send('Invalid video ID format');
  }

  const url = `https://www.youtube.com/live/${videoID}/live`;

  try {
    const response = await fetch(url, {
      headers: {
        'Cookie': COOKIE_HEADER,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      redirect: 'follow'
    });

    if (!response.ok) {
      console.error(`YouTube error: ${response.status} for video ${videoID}`);
      return res.status(response.status).send(`YouTube error: ${response.status}`);
    }

    const html = await response.text();
    const hlsMatch = html.match(/"hlsManifestUrl":"([^"]+\.m3u8[^"]*)"/);
    
    if (hlsMatch && hlsMatch[1]) {
      const manifestUrl = hlsMatch[1].replace(/\\u0026/g, '&');
      res.setHeader('Cache-Control', 'private, max-age=30');
      return res.redirect(302, manifestUrl);
    } else {
      console.warn(`No m3u8 found for video ${videoID}`);
      return res.status(404).send('No HLS manifest found');
    }
  } catch (err) {
    console.error(`Fetch error for ${videoID}:`, err.message);
    return res.status(500).send('Internal server error');
  }
});

app.get('/health', (req, res) => res.send('OK'));

app.use((req, res) => res.status(404).send('Endpoint not found'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📦 Node.js version: ${process.version}`);
});
