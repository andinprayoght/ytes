import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `GPS=1; SID=g.a000zAjGRWtuDV-HxfM6CI6RKyV2o4jGZt9hjrX0CQROJa5VL-5wJyDbVssb-7sxrdJ3m-POPgACgYKAUcSARMSFQHGX2Mi2BDKOkgyOoHL9Z_Edpy17RoVAUF8yKprkOXhscq-N6nuH_OL0m2d0076; __Secure-1PSID=g.a000zAjGRWtuDV-HxfM6CI6RKyV2o4jGZt9hjrX0CQROJa5VL-5wGi6HrZR_91hztAjK3p9x7AACgYKAY8SARMSFQHGX2Miru6hzmtzepe5ouvWUntqcBoVAUF8yKqzxPGdas2l7x3rD1nKPSaR0076; __Secure-3PSID=g.a000zAjGRWtuDV-HxfM6CI6RKyV2o4jGZt9hjrX0CQROJa5VL-5w8azMw4mjCs6UH-_JLBcKWgACgYKASsSARMSFQHGX2Mi93UNTbDfmeV8wpPtqa2oiRoVAUF8yKrYNQnzRDi39YjX_vjcpdXZ0076; HSID=AuPbzct8C4mRHJ26j; SSID=A1JvYUms5VXIAGgXp; APISID=aD9_M6rp8ClDQQAw/A3wlKPEbAxGaIyIth; SAPISID=eHCJefK9MCmj7Tyw/AhCkQInoinanbmfcv; __Secure-1PAPISID=eHCJefK9MCmj7Tyw/AhCkQInoinanbmfcv; __Secure-3PAPISID=eHCJefK9MCmj7Tyw/AhCkQInoinanbmfcv; __Secure-1PSIDTS=sidts-CjIB5H03P496uOWqtXjkuwXP72etSr6rbWh2nOCk1B2K_x_Br_dp6o3NfJrJfumT5GDlUBAA; __Secure-3PSIDTS=sidts-CjIB5H03P496uOWqtXjkuwXP72etSr6rbWh2nOCk1B2K_x_Br_dp6o3NfJrJfumT5GDlUBAA; LOGIN_INFO=AFmmF2swRQIhAJyfMWa9rrYPdce9Y38w4u8nqStr0SFwnHykQNllAjUGAiB-PUl1GxO_eJi-bVfHG3nexbk1PXlZAp1T65dXuJJJzg:QUQ3MjNmd2pKcGlHeU1DMnJnUTZCd0QtRWtKaDhJaXlVaVl1WVZQYlJrZ3NmVF9MdnBlbHRoaThfOWgwTkhxSXF3WmVaVVdrTEZDaFQ0SkI0d2ZJY196RHp5bk1RcGFKa0lqajJtemdVTXJtWUpGWG9IU0NFM290RjJfZGpYeWlLallicHB1NVREcjJvSHB1NDBlbF95SHhqckp1VFJDT3p3; PREF=tz=Asia.Jakarta; SIDCC=AKEyXzWcXlRbQtleqrJSPhJqwIHY9R-1fI4qKFKrCiJMScMOmYJtPZlhTrZqu51KyrbeUpu7-Q; __Secure-1PSIDCC=AKEyXzXB0OJviFtVX-DNBmICQ4Kf9SAs_YoLrVm4hvjXovzku8BWBKkUSSwoqm8oYAo-R4MC; __Secure-3PSIDCC=AKEyXzUmB5GpOvZxEWomd-o3R4RdXM_MuFhAmUrE2tFoe5db-qqvPl1gIh9aFkhwVwInqUoc; YSC=PSPF5v9P89U; VISITOR_INFO1_LIVE=Pd1MhnoSZ3c; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgLQ%3D%3D; __Secure-ROLLOUT_TOKEN=COz1i6f-p-rPtAEQhqnl8qfAjgMY47HB9KfAjgM%3D;`;

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
