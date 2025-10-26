import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `__Secure-3PSID=g.a0002AjGRR9ImruvcQhzYZVz_6gCJ40srCLcPivYk19DbcqKTDdDxj6d2Ky8ZeJwHZswtv-qvAACgYKAYwSARMSFQHGX2MiGEn1f5lOxXzWdOazJ75wyhoVAUF8yKpVJClvcsMm0dcUX_xMsYxp0076; __Secure-3PAPISID=C9hFexOJoJyJpHOJ/Ah7hsJ6xR30j-EB9k; LOGIN_INFO=AFmmF2swRAIgdbpvUtn6EnLh-pAAWuGobkn2BNLdqaPdbkV-sMl5jA8CIAbJptZ3O3QkxitUls92Einp43YaLOpHQTPXWh1g547O:QUQ3MjNmekgxbnFzcUtjRHFJWTg1SEFJVG00YURpdDZCdVVSV25PcFZGeFRXTmxUMERmQkxxOUdHR3NGZEtfMVJfN1Y5cE94LVpLZDR2QnF6UF9xU3FRdlRhNDdaOGhHVlUtOHZLOU5VWU83NWdjQ1lZVlJmWDUybU9fUWxjcHhiNU1LckhFcEtqX09ZNmxOalVEY2o3c01RcEZKcXJmWDl3; PREF=tz=Asia.Jakarta; CONSISTENCY=AKreu9tatnnrR5dk5KSVIHQ7bE5Nzqz3UmTjSU0A7YzK2QBwkY1OTGA_qY4ZOPXT4mgWSzJ7t87COIHv8czdT30E000BLirCD4nShK-cS0iETy6jJmEnM9YJz8ariAsxaUTbVf6luDMKiOL8tsbKi_iA; __Secure-1PSIDTS=sidts-CjUBwQ9iI7xmMDTS8a1N9zjv--BB6kuug3rBLzq_Re1EPu0Z8DpIQFh-sWQwKN4phHq0gApBExAA; __Secure-3PSIDTS=sidts-CjUBwQ9iI7xmMDTS8a1N9zjv--BB6kuug3rBLzq_Re1EPu0Z8DpIQFh-sWQwKN4phHq0gApBExAA; __Secure-3PSIDCC=AKEyXzUUWkvH2ngmtP-cNNrM8MzuK-oYq5svlXmof11CX7S5UEfOQh4JqLt4IHRL0B4BK8bu; ST-183jmdn=session_logininfo=AFmmF2swRAIgdbpvUtn6EnLh-pAAWuGobkn2BNLdqaPdbkV-sMl5jA8CIAbJptZ3O3QkxitUls92Einp43YaLOpHQTPXWh1g547O%3AQUQ3MjNmekgxbnFzcUtjRHFJWTg1SEFJVG00YURpdDZCdVVSV25PcFZGeFRXTmxUMERmQkxxOUdHR3NGZEtfMVJfN1Y5cE94LVpLZDR2QnF6UF9xU3FRdlRhNDdaOGhHVlUtOHZLOU5VWU83NWdjQ1lZVlJmWDUybU9fUWxjcHhiNU1LckhFcEtqX09ZNmxOalVEY2o3c01RcEZKcXJmWDl3; VISITOR_INFO1_LIVE=HdZx4MkHsp4; VISITOR_PRIVACY_METADATA=CgJTRxIEGgAgPQ%3D%3D; YSC=SArqUo030uU; __Secure-ROLLOUT_TOKEN=CJGDqfeHvI7YuwEQ19OCs8iWkAMY3u2Xz9bBkAM%3D;`;

app.get('/live/:id', async (req, res) => {
  const videoID = req.params.id.split('.')[0];
  const url = `https://www.youtube.com/live/${videoID}/live`;

  try {
    const response = await fetch(url, {
      headers: {
        'Cookie': cookieHeader,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return res.status(500).send(`YouTube responded with status: ${response.status}`);
    }

    const html = await response.text();
    const match = html.match(/(?<=hlsManifestUrl":")[^"]+\.m3u8/);

    if (match && match[0]) {
      return res.redirect(302, match[0]);
    } else {
      return res.status(404).send("No .m3u8 URL found in YouTube response.");
    }
  } catch (err) {
    return res.status(500).send(`Fetch error: ${err.message}`);
  }
});

// fallback
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

const PORT = process.env.PORT || 7860;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
