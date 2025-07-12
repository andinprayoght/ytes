import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `SID=g.a000zAjGRSGqFIV8NGDa9nvCTZJJuUA-Xs7XAUyfpL4X27xc0sbXhEUZHseS55skJtpIxWx5OAACgYKAQkSARMSFQHGX2MiT0hY5rzQjMgZIV7nfjBwUxoVAUF8yKpMIXwqbhvTaJvlkgjtSfhn0076; __Secure-1PSID=g.a000zAjGRSGqFIV8NGDa9nvCTZJJuUA-Xs7XAUyfpL4X27xc0sbXlQ-3nUfqFSGvaZxxWGhVhAACgYKAbUSARMSFQHGX2MiamwBKj7yA7-dLPh4RUuLIhoVAUF8yKpiJJY5i0wvLeyGAB-IhWET0076; __Secure-3PSID=g.a000zAjGRSGqFIV8NGDa9nvCTZJJuUA-Xs7XAUyfpL4X27xc0sbXsJIEWGsGRqpLye7WxCkD7wACgYKAaYSARMSFQHGX2MiVMhlALq6wYBvcnCSxv3hyhoVAUF8yKrP3-Tcd3Men1nEuCS7XzKC0076; HSID=AXpPtEc04BsaEmk_W; SSID=AKEneQ0d3sqZVTfH7; APISID=QVJ_dcpjCwOakfKw/AqeL5MGglwURr9MDg; SAPISID=xNjCJuEaNEHNHR49/Aa5ie-g1bT_q9-BSm; __Secure-1PAPISID=xNjCJuEaNEHNHR49/Aa5ie-g1bT_q9-BSm; __Secure-3PAPISID=xNjCJuEaNEHNHR49/Aa5ie-g1bT_q9-BSm; PREF=tz=Asia.Jakarta; LOGIN_INFO=AFmmF2swRAIgCgiYRcojn78QvRkvVHjBlZT6ttB36N6a9tm36I1VSrYCIC_Fo8KOzma7ta_jgZ8CwoCbo3Av5rvxLLUoJr7i5Vt_:QUQ3MjNmeFNoWVFSMkZweU50TndrdHhRYXFwaWhFM2RhaV9hdVlFOG14d24wYXdOWHhaR3NWeElFYVp6Uy1pSzVkejJiV1owdmFsYklIMVdFVWpyaFpnV01JN0hVWFlWVHptZ2pDVDFkUTMtb3JZRk5zbndBb0k0eHJ2NFZxU2FKcFltdnN5OGZxckNYVllXSlR6WVNkbE43bEtKU0VNeFFR; __Secure-1PSIDTS=sidts-CjEB5H03P8Znw8ARXkr3AjV8YFmPcHelZ97XySOP1gx_FY8H0A5E26CAQ8iT958lRVPtEAA; __Secure-3PSIDTS=sidts-CjEB5H03P8Znw8ARXkr3AjV8YFmPcHelZ97XySOP1gx_FY8H0A5E26CAQ8iT958lRVPtEAA; SIDCC=AKEyXzWG1yBWWyouootnUad0Odr59M83JTsROr7rCX9X_snSCYU8FXNZ5N7v9738t0wY0F-3; __Secure-1PSIDCC=AKEyXzU2FNiqRQ0T727sD_nlJ38uUyMrb-cmFn0MpjLy8e43IQ__P-syZ7wgNDwaNRBpI9XV; __Secure-3PSIDCC=AKEyXzV0uc4c396n2nlxRs519Qp7NUsjOqhYcaheGX5krHxvskhAWS5k9JSwgquveOu6GwEnyw; __Secure-ROLLOUT_TOKEN=CI-trOXE-uO7xwEQhKPXh_ugjgMYsOODw8G2jgM%3D; YSC=qh-niQLFc94; VISITOR_INFO1_LIVE=KXtfOYrFNXo; VISITOR_PRIVACY_METADATA=CgJJRBIEGgAgMQ%3D%3D;`;

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