import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `__Secure-1PSIDTS=sidts-CjIB5H03Pw5EZCYPpub5LtlGgW6gQ8gFlkBku0B6AhX2FM2NI0wF1RGo629mu5zcMDI54hAA; __Secure-3PSIDTS=sidts-CjIB5H03Pw5EZCYPpub5LtlGgW6gQ8gFlkBku0B6AhX2FM2NI0wF1RGo629mu5zcMDI54hAA; SID=g.a000zAjGRRdGdUtztIQynLbVIQ39SBzpqaqUKeUeA3Xlwx3BCS0fZnaJsnUlzEkkE2WuEQ2DUAACgYKASQSARMSFQHGX2MiyonsvceYpVE4QJCZeEJ5_RoVAUF8yKozFFTwOqVcpYTMhsDp0e5K0076; __Secure-1PSID=g.a000zAjGRRdGdUtztIQynLbVIQ39SBzpqaqUKeUeA3Xlwx3BCS0fBpIfvKmV5AD-alKe4aMZdQACgYKAakSARMSFQHGX2MixjfllNEPID-wIWP1dolUDhoVAUF8yKr5HNVYimU5h1BrXmQ4zmd80076; __Secure-3PSID=g.a000zAjGRRdGdUtztIQynLbVIQ39SBzpqaqUKeUeA3Xlwx3BCS0f41JcX-X3eOqwAYsmJczPywACgYKAV8SARMSFQHGX2Mib4_pZg2bOUEYABcqjZlnkhoVAUF8yKp5BLh9ocLcNv_JNeR1lYQ50076; HSID=A4KWAGicYyMnsgZUA; SSID=AAgx9gavD6TdCL8mS; APISID=Dn0PkHFKd77IjH5A/AtwPwOdm0MANh2DkX; SAPISID=hmpEbXhYbxyZhIG3/A3YFMJoworIS1z-Vo; __Secure-1PAPISID=hmpEbXhYbxyZhIG3/A3YFMJoworIS1z-Vo; __Secure-3PAPISID=hmpEbXhYbxyZhIG3/A3YFMJoworIS1z-Vo; PREF=tz=Asia.Jakarta; LOGIN_INFO=AFmmF2swRQIgWM_lCgKmOEldVieNQff0-mdJodO4N5VNbMVV4YN2SGECIQCmzRqgZcvenY1zt1tfWXbkZCJfhRhNnlI-9W3QCdNkeA:QUQ3MjNmeXpEWG42Umlzd2FBRzZlaFpHVW1XdXZWb29xSlNrZHNKTmhaZzBHYWZWVlJraHJ2VXV1M0NacG4zdGtIWWtvNV9Ib2NwSzdGWGVWUklzN0laOFVlakM0MDgzemVSSFU0eE9ZaWJJNkdYRUlDMjFBYXowZkVhOXNaWXRfTDlFbFNKUmZWYjZLYjJnTkt5YWk3SldyT0EyU0pnUFFR; SIDCC=AKEyXzUIP38X0Xw0Mm0vMsry1eVuNfcM2O3RJDWZ4wxRe_tahSZFK9ZeApR16NezgDBXEGcPxg; __Secure-1PSIDCC=AKEyXzVBAsIRM0VYQc859o5xdit4tgSkh9g4Sgq7jxOxPgKMoMxn3Kftj8-Bqx-yZIHV0ve0; __Secure-3PSIDCC=AKEyXzXfLiHQ0fTQIz-eps4qODhiUWiufw7ksRWaTRkTxWsO9qFJmc0-NOpccZHarorChK_E; YSC=UzclvPZpH6A; VISITOR_INFO1_LIVE=PSzO7sGshr4; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgQQ%3D%3D; __Secure-ROLLOUT_TOKEN=CJ-q0fPtwe6tQBCI49mZuMGOAxjd_OybuMGOAw%3D%3D;`;

app.get('/live/:id', async (req, res) => {
  const videoID = req.params.id.split('.')[0];
  const url = `https://www.youtube.com/live/${videoID}/live`;

  try {
    const response = await fetch(url, {
      headers: {
        'Cookie': cookieHeader,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36'
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
