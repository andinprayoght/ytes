import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `GPS=1; SID=g.a000zAjGRWwe0V3MFYxvsdB5yoQsTCyd_Sj6zUmOpQI0OhkwxnIJgmipgeuDBNpAdvUhv6JoOgACgYKAUISARMSFQHGX2MiJ1lYPmYxl9LxdTjWC_BdLhoVAUF8yKqBqu_8Bl8LoWwt9laBGBeG0076; __Secure-1PSID=g.a000zAjGRWwe0V3MFYxvsdB5yoQsTCyd_Sj6zUmOpQI0OhkwxnIJ7mQ28E092oQ5-9f6QnbHDwACgYKAdISARMSFQHGX2MiWcUuDR3THIwQzBORHzbTJBoVAUF8yKojdt9VTLsf2uhkDXv59wSw0076; __Secure-3PSID=g.a000zAjGRWwe0V3MFYxvsdB5yoQsTCyd_Sj6zUmOpQI0OhkwxnIJOpLAFNXDknN9Qlq1J8PezwACgYKAUkSARMSFQHGX2MiEZ6UbZwnRfUcoMIiQBaOBRoVAUF8yKq-AtOTpwPrjOhGckykXjgJ0076; HSID=A26XoIONlH6nEv_kM; SSID=ADQ-1rlMW_GeEAFBG; APISID=P4uDwcUo0lp04q2E/AwOfHyi63-zilS6-z; SAPISID=5Oef38SkqIIEkKZm/Avjxeodjg0RBPTPsw; __Secure-1PAPISID=5Oef38SkqIIEkKZm/Avjxeodjg0RBPTPsw; __Secure-3PAPISID=5Oef38SkqIIEkKZm/Avjxeodjg0RBPTPsw; PREF=tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjEB5H03Pxwh4OqVFWqMR7UBfjBW0u5gMiSF5hJUy5MUHeHQUXsa8KphOrhLLidXox-6EAA; __Secure-3PSIDTS=sidts-CjEB5H03Pxwh4OqVFWqMR7UBfjBW0u5gMiSF5hJUy5MUHeHQUXsa8KphOrhLLidXox-6EAA; LOGIN_INFO=AFmmF2swRQIgDutSNan1VN1rYDrR_E73PQq-TOLCCOgy_574_UZlrcgCIQD0dF6TTpZxx6KnlrD6aDuaq2EwyNYpwZrtxHA2rB5saw:QUQ3MjNmdzdHbzRzNmVxYWtORGx0elhYREpsRTdfY0NoSVJIZmg5VDFqUlczRDg2dXhwd1RQODEtd2w3UVdSbUFHU1ZDREFoSTNod2I1a1phZkM0REYwMVFpajRiZjBuMW9mOVJySHEwa0hIWXpMRUxTVVBab2lWdzhpdzRsZWJLWS1mSnphNVhrTFc3c1BpdWRvbmpheGt0cWwyNXl6Q3dR; ST-183jmdn=session_logininfo=AFmmF2swRQIgDutSNan1VN1rYDrR_E73PQq-TOLCCOgy_574_UZlrcgCIQD0dF6TTpZxx6KnlrD6aDuaq2EwyNYpwZrtxHA2rB5saw%3AQUQ3MjNmdzdHbzRzNmVxYWtORGx0elhYREpsRTdfY0NoSVJIZmg5VDFqUlczRDg2dXhwd1RQODEtd2w3UVdSbUFHU1ZDREFoSTNod2I1a1phZkM0REYwMVFpajRiZjBuMW9mOVJySHEwa0hIWXpMRUxTVVBab2lWdzhpdzRsZWJLWS1mSnphNVhrTFc3c1BpdWRvbmpheGt0cWwyNXl6Q3dR; SIDCC=AKEyXzU38qlvUqhFWVSESJUtKwrrVP0JQtDzPt2G3DSPfeolv2ePZfCDWVfyuj0RdZNMMFdPCQ; __Secure-1PSIDCC=AKEyXzXG5IvswyL6jTTj5VTMeirvk2w7g6e2CCp5ZFfzHKeX8Em5zFkM8rFoN3Ki-pGMvKkHtQ; __Secure-3PSIDCC=AKEyXzVBPX905gGNMt-pRN_kbSH7_by07P-btxvrt0zUek99OsVPvlNjgrFj9l-K1s5VQuEOBA; YSC=tKfCj3LcQpE; VISITOR_INFO1_LIVE=9LnoPbQ3VyA; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgVw%3D%3D; __Secure-ROLLOUT_TOKEN=CJKGnfe-rrGxDBDCvvfl-L6OAxjF9abr-L6OAw%3D%3D;`;

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