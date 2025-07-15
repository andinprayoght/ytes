import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `SID=g.a000zAjGRQ8cPT04LGdU3Gkx5QXowtAWnvv3vIw9a_5-kbWU1thKpcCL07HAjBugzFp1pMkOIwACgYKAWUSARMSFQHGX2MiBiVj1sSHCx51hg4kwYeIhxoVAUF8yKpcmzNgMctAm3xwNU1ianhb0076; __Secure-1PSID=g.a000zAjGRQ8cPT04LGdU3Gkx5QXowtAWnvv3vIw9a_5-kbWU1thKFB1K9kcUgWOXOTsB49KjAgACgYKAVcSARMSFQHGX2MiPOd3qbCfJB2ootbyQNT8BxoVAUF8yKor5xhePMHi1SrysE6FAmVC0076; __Secure-3PSID=g.a000zAjGRQ8cPT04LGdU3Gkx5QXowtAWnvv3vIw9a_5-kbWU1thK_XtsusJcFwspeQI3KQzx_gACgYKARESARMSFQHGX2Mis-O_MB94dYFw6us1OWo_MBoVAUF8yKrQbpRphbTsgW42Mya8Fhnq0076; HSID=AgfOn484jkBruvGhb; SSID=A_Z7cT2OGxBVjLkBG; APISID=VjUUj0qH-ikE3VCy/APdkmBUp4R-WbhvCP; SAPISID=keWPw9v4jbwWqhrj/AJtku_gzqww5zKTq2; __Secure-1PAPISID=keWPw9v4jbwWqhrj/AJtku_gzqww5zKTq2; __Secure-3PAPISID=keWPw9v4jbwWqhrj/AJtku_gzqww5zKTq2; LOGIN_INFO=AFmmF2swRQIhAN52kQ8BtueJY_2hj7aUs-bUA-ivkQ0TV8FG1OIjMDeHAiAECGV9TcTRMJOgGnIJBi5sogUIp96Fh4zVya4L7frhQA:QUQ3MjNmeFF0d19iTUxJbzB5OWI5VENvS0NRdWtsRGt3ZXJLRkhPZHhYMUxQdGJzR2hxdGZZNDc3MWxfSHJxQVJ2a09UN29UQ3NmdmdOTFAtbUs2dVpEMmNGaE9LRnJTaDhhaVdLaFF3N1N1S0lmUk5GTlNCaEdQb3dpT2pCd0J3S0VOTmx0Q280RVRVSkY2MC0wWmFXb2xKRjJOQ1lnNll3; PREF=tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjIB5H03P7ehPoZrLbMXynDKzy9IquIrZo3Af27LJszBOk2T9SC56uWl9GhKLkFkKqQjuhAA; __Secure-3PSIDTS=sidts-CjIB5H03P7ehPoZrLbMXynDKzy9IquIrZo3Af27LJszBOk2T9SC56uWl9GhKLkFkKqQjuhAA; SIDCC=AKEyXzXJp-qqY7JyofLUmKzaHw-W35gY8XnvqSjjcIkOrUoiORrgAW6CqAmkyDet92BZz3kj; __Secure-1PSIDCC=AKEyXzUGvLRqk6WqXggxQ-XEgIyVd3u6inCfyxwvu1wvYdcdm26DzyzZYcNyEdirTjXFUdt7oA; __Secure-3PSIDCC=AKEyXzUbpWsJvRTBc4ixWsnuaPkX_seMBkxltWV3H-xsdQzUzjK3rBBrFA3xzUJ8ozZTV8p9yA; ST-sbra4i=session_logininfo=AFmmF2swRgIhAJTNj3N89Rec_T3SKS-7BKD0RuZxJZ-ZSUwEHOOPu6C_AiEAoah823yqQ3ohr2Qv75RZZiTD6JNPFY5li5upYuugAUQ%3AQUQ3MjNmdzFaMS1IbVRURmNSU1Q2aG03cEhzM1RvaGRzQ1FSSHlmZEdadjhxRUZfblQ1NXpEZlQtSDBOUF92eUc4VHg3YnByY21TcGlQeTVYQ2ZIcjFrZ2dUd3AyNng0R3kxdUM1WjJJc1MyaUNsYWN2dExDYlFkR24wSElKYll6SURHSVoxR1Q5T2JueDFKd0UzRFhGWmhsMktWMHJpaWJ3; YSC=7XcWwjc4YNs; VISITOR_INFO1_LIVE=k5cCPrjhumo; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgTQ%3D%3D; __Secure-ROLLOUT_TOKEN=CKq18LXZzLuh9gEQ1PGdi4u_jgMY76y8jIu_jgM%3D;`;

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
