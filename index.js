import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `SID=g.a0002AjGRZVf3cG1P16PjM4ahHo1RtRxcCUpKaDkWtDLb8SHZmtlu3Tiec2afpZDONHg_veHAQACgYKAfwSARMSFQHGX2MiDcOLa8FMf1bR9sXPF3LJQRoVAUF8yKpFNs-gglqgOGNTTyFp24_R0076; __Secure-1PSID=g.a0002AjGRZVf3cG1P16PjM4ahHo1RtRxcCUpKaDkWtDLb8SHZmtlBKp2ZydVtdKrQJkKygRp5gACgYKAa4SARMSFQHGX2MiQWY0cbPvCjkspOhhhVOfOxoVAUF8yKpVOT6pHg3uDLXj0Dy618ay0076; __Secure-3PSID=g.a0002AjGRZVf3cG1P16PjM4ahHo1RtRxcCUpKaDkWtDLb8SHZmtlwcz1zqed-K_TUpBn-V1KVQACgYKARoSARMSFQHGX2Mi03ypy0k5aEzkyu4JeUFNiBoVAUF8yKqxyiMvP7ImgHkzDtdY36pc0076; HSID=AnpbGsRtBoKxPW3S6; SSID=ASbsH209pgY5yIRbR; APISID=Cy6uYNLzG-4X0sG0/AkZ9AhHaBzwj-8Tgm; SAPISID=SaW-c26V6TzaXUgr/ADlpyH4R8Fma5gjp8; __Secure-1PAPISID=SaW-c26V6TzaXUgr/ADlpyH4R8Fma5gjp8; __Secure-3PAPISID=SaW-c26V6TzaXUgr/ADlpyH4R8Fma5gjp8; LOGIN_INFO=AFmmF2swRgIhAOc1ftVqcFjMqWOxrCB8hOx_926lugXJMzorp-x_raFNAiEA886IC0PY33iOezJJju2RZV4jY1LdTkWnHQAQXgPzpZ8:QUQ3MjNmdzNqekpiVDZheF85a253QUg4U0k5emM0TU5mOW9hcHNRZTVRQ3c0N28xdkFEVnBjSjF5QzVyZ3pyejVGVnJsYmdkTGZUb0lhcjV5aXhweDJRUVZnQW1jeU95UjM4WnhpOUlubWp0WXNmZ1FuTURsS0pZRFFNYkFUcW4wUkgzUzdJcFIxYktyNjVIZmhLTVIzUGJjRlNqSnRfN21B; PREF=tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjUBmkD5SzrsLbFLxyVoy1auVRqVg7NOeDtBWsjUB-bpV8qAl9eB70WgSdjuY9hS4boH-N7DlxAA; __Secure-3PSIDTS=sidts-CjUBmkD5SzrsLbFLxyVoy1auVRqVg7NOeDtBWsjUB-bpV8qAl9eB70WgSdjuY9hS4boH-N7DlxAA; SIDCC=AKEyXzVerUeR6fes8mw0lOI9m97xW1yonZ883GfgDVU4fUv_SanXdH5SdBBXiCVs2Agg3xIx9Q; __Secure-1PSIDCC=AKEyXzUqkXCSr94ztKQpI63H8WlOPpiiml0ZVZwt9Usj62bz7ytTh_IuvA2N4A5Nw2DPlQjB; __Secure-3PSIDCC=AKEyXzW2V-NdYM5Fedtu8SXQK9wgst_4xGqgYOWXQyq8TLzkgVkc7PRBnNmiGUQySThfWKgt1Q; __Secure-ROLLOUT_TOKEN=CLfv0pKYprK9eBDJwoes6PqPAxiw4o742ZOQAw%3D%3D; YSC=N6Va31ofPLg; VISITOR_INFO1_LIVE=fmZLZOtHnSc; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgFw%3D%3D;`;

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
