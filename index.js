import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `__Secure-3PSID=g.a000zAjGRaU_3Y_1Uf7muwNa8ecle4kjCkTwqiL91JWNHNxg7Nz9hdvIuxerNzBZoG4B25XeLQACgYKAXkSARMSFQHGX2MidkSwvBkEyrTY2Rcie0OxmRoVAUF8yKp-5-iKuPZhTiQ0D2iainuH0076; __Secure-3PAPISID=MVcW2JLuinLcDgJC/A4tVJxvzycLtJI2ut; GPS=1; __Secure-1PSIDTS=sidts-CjIB5H03P-xaEu1zphTF_qOOulXcjVglz0g2t5Pceu_mnrniSrfpeaNpd5jlHRO2cNU0QRAA; __Secure-3PSIDTS=sidts-CjIB5H03P-xaEu1zphTF_qOOulXcjVglz0g2t5Pceu_mnrniSrfpeaNpd5jlHRO2cNU0QRAA; LOGIN_INFO=AFmmF2swRQIgAZeMoMDwzDX889k_zhD1woDa-vV2tfd6SKmg4ZRkEeQCIQCl9YRq8a48Ohd1XNfiHHRa5dVCy5cLnISbRUVvIxJcjg:QUQ3MjNmeFUzVUtGdDBOd1JDR0ljeXduams0bjVUa09aaW5CTmN0MWdpVVRBVkFMYnFoTkRSdWNmXzVMdkZzTlAtYWpJT2xCMEVzX21obHQ2dGh0SVFoUGZIc3pnNTFOSVdNY2JJWEp3WHBRZFppOGtoTVRVUjZUNWlGNzRzMDlWRjhoMVd1bndTWmJCR205TWtGVnpkNGRWbDUzdXI2TURR; PREF=tz=Asia.Jakarta; ST-183jmdn=session_logininfo=AFmmF2swRQIgAZeMoMDwzDX889k_zhD1woDa-vV2tfd6SKmg4ZRkEeQCIQCl9YRq8a48Ohd1XNfiHHRa5dVCy5cLnISbRUVvIxJcjg%3AQUQ3MjNmeFUzVUtGdDBOd1JDR0ljeXduams0bjVUa09aaW5CTmN0MWdpVVRBVkFMYnFoTkRSdWNmXzVMdkZzTlAtYWpJT2xCMEVzX21obHQ2dGh0SVFoUGZIc3pnNTFOSVdNY2JJWEp3WHBRZFppOGtoTVRVUjZUNWlGNzRzMDlWRjhoMVd1bndTWmJCR205TWtGVnpkNGRWbDUzdXI2TURR; __Secure-3PSIDCC=AKEyXzV1ZfiCO3pm-ZKL93I9aPltnAedXqkNGoW4o6xacUAtW336ZrDYL36Ou8adBQfuPWzPhQ; YSC=bXMJbotkck4; VISITOR_INFO1_LIVE=JeMlI_ofBmM; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgRA%3D%3D; __Secure-ROLLOUT_TOKEN=CKaz6ZWkkOzA9wEQtO-_u7nBjgMY7bbsu7nBjgM%3D;`;

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
