import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `GPS=1; SID=g.a0002AjGRQZPafhc7EAXljM0ynzX_JGf9xb3HtMcjcCtKvB3WmrrqBUt0OgLO0U2ka9IK5BFKQACgYKATcSARMSFQHGX2MieSTZp5rfukv3FmD5e7ogSRoVAUF8yKrboD3pZadElUBkUZELOOv50076; __Secure-1PSID=g.a0002AjGRQZPafhc7EAXljM0ynzX_JGf9xb3HtMcjcCtKvB3Wmrr5Ldd0VvTfeVqkoc3yRWgHgACgYKAfwSARMSFQHGX2MiC6tQoNuAi-6oM77qBZY4tBoVAUF8yKplxPy2wkwXYnujnrcIL4Iq0076; __Secure-3PSID=g.a0002AjGRQZPafhc7EAXljM0ynzX_JGf9xb3HtMcjcCtKvB3Wmrri_lxuUJsv2JkSK3i3j3opwACgYKAecSARMSFQHGX2MiMLTg29WYAtOKg6yurWejrhoVAUF8yKoN7U8sSGlc3VDZeWeZIO7y0076; HSID=AByxxjohM0lRdATMk; SSID=A3McNFBOqBCTrYxCQ; APISID=8_UccsS5ex68wywR/AljObD-S0AYMyK7zr; SAPISID=KOZryv6SIAp07kyM/A4DzXxTpTkmAEZ-9Y; __Secure-1PAPISID=KOZryv6SIAp07kyM/A4DzXxTpTkmAEZ-9Y; __Secure-3PAPISID=KOZryv6SIAp07kyM/A4DzXxTpTkmAEZ-9Y; __Secure-1PSIDTS=sidts-CjUBmkD5S-C_woUitRKJl-jjsJ0AKWkwQJp6ZMIac7KkgIlBTLiMuVyEExqRB5iaUEn5DNuH_RAA; __Secure-3PSIDTS=sidts-CjUBmkD5S-C_woUitRKJl-jjsJ0AKWkwQJp6ZMIac7KkgIlBTLiMuVyEExqRB5iaUEn5DNuH_RAA; LOGIN_INFO=AFmmF2swRQIhAJedJ4qrdSjd9YKSBNDAPDfqvaqhDVLA5s5OeYViFZFLAiA0MZBzJAc9e6KNR4qjOnOFjjn-hu-aJOoNBM0SJOUuDA:QUQ3MjNmeUtBUkc2M290dTZ0aTRaeHVpZUxKNy1aUHpqZDJ1a3BqbzdOQlBJX1dBWHdTcWxJbGJvQVRwT1p5RVNUZnU3Y1JQSGNrMnlid0JiZFkzdXVka1lDdFREQ3hxclZyYXpnTGI2T3hYZDA3TGF2NVc0dV8wUThRZ0NDRnQ2Mm5nNjhiVVY2a1dId0ZBa0lDSjF0Rm05QnpyR1BTR2hR; PREF=tz=Asia.Jakarta; SIDCC=AKEyXzWlFjSLhxgQxScQTa2V2HeD1pzqLHYfchKOH4GHDKv51txf8TgFTR6rLaxlkPKrOjeqjg; __Secure-1PSIDCC=AKEyXzWKHU-R7ZwCyKHO_YLV4peVCarsInmJaSnmCIJoJwaBE4XlN9OsIPiWfNgnWqKUNL1r; __Secure-3PSIDCC=AKEyXzV6ZVpLNTccVtSlMDlXP-m8KWZjk3KKMUjQ6L_KlsgCFbxE3P2vTERfnraXthuzWfNF; ST-183jmdn=session_logininfo=AFmmF2swRQIhAJedJ4qrdSjd9YKSBNDAPDfqvaqhDVLA5s5OeYViFZFLAiA0MZBzJAc9e6KNR4qjOnOFjjn-hu-aJOoNBM0SJOUuDA%3AQUQ3MjNmeUtBUkc2M290dTZ0aTRaeHVpZUxKNy1aUHpqZDJ1a3BqbzdOQlBJX1dBWHdTcWxJbGJvQVRwT1p5RVNUZnU3Y1JQSGNrMnlid0JiZFkzdXVka1lDdFREQ3hxclZyYXpnTGI2T3hYZDA3TGF2NVc0dV8wUThRZ0NDRnQ2Mm5nNjhiVVY2a1dId0ZBa0lDSjF0Rm05QnpyR1BTR2hR; YSC=G7Fh57CS6tc; VISITOR_INFO1_LIVE=12VsScV6RtE; VISITOR_PRIVACY_METADATA=CgJTRxIEGgAgRw%3D%3D; __Secure-ROLLOUT_TOKEN=CPrmnO3Nw7qqKhDNjOy7npWQAxiC6NK9npWQAw%3D%3D;`;

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
