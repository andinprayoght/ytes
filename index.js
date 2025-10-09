import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `SID=g.a0002AjGRXtn9AkBAGI-3k-mCG2r9Ufma6x-EkEabkyeeXhjoN_R2V7XJC_dpwK2ULOsmBjjNwACgYKASISARMSFQHGX2MizV4zPdSr_buFEaD8wQ154BoVAUF8yKo0PPmKIkRQdytOv2t3HLLs0076; __Secure-1PSID=g.a0002AjGRXtn9AkBAGI-3k-mCG2r9Ufma6x-EkEabkyeeXhjoN_RAQwbSWmnlkOr-FtqHfXapgACgYKAcYSARMSFQHGX2MiNlUy06B0AZ0ws8dzHmPiaBoVAUF8yKpxJx6HdHuHarQ7TnjbMAGH0076; __Secure-3PSID=g.a0002AjGRXtn9AkBAGI-3k-mCG2r9Ufma6x-EkEabkyeeXhjoN_Rc29RCOm3h2Z84qwU6FFdxwACgYKAXISARMSFQHGX2MiQcjNd5P_Cwh3or8SMls1tBoVAUF8yKqg7aD8xck_wHVd9wmSv2MU0076; HSID=AVUHt0UXO2h5DYHgG; SSID=AhTdAGygxxJJ94n0Q; APISID=BODVCVVcE05cefFY/AgepKlVXhPzfBhkaB; SAPISID=LiLUj_-38d0cbtFj/A-9Z7jAjnX_FG-1NI; __Secure-1PAPISID=LiLUj_-38d0cbtFj/A-9Z7jAjnX_FG-1NI; __Secure-3PAPISID=LiLUj_-38d0cbtFj/A-9Z7jAjnX_FG-1NI; LOGIN_INFO=AFmmF2swRAIgXlMUcosNMhRyTfjSTQx2D67xoPS5hg4qaV5HpNoVM48CIGljaabis0YfX8nu1v0ZRqE2CNHQxiVUgQed0uFUtxXE:QUQ3MjNmd1JjR0FUM25uMWpIcFY0c2F3NGNSaGdUVDJkdTRvM3VOT3BRQWk5Mlc2cGhaajdKSlktQTFRNUZrbFNuMmVUbzRuRnBPMmtoemc2STU4QXdRdUY5Tmw3djBrMkdtNEhxNTdpdmduZHZHUkliWXZVcloyRFRJT3cwMFp3OTlkVXJaekJTelZlX1RvWHRfQUhzc1lMSkoxa09LdGp3; PREF=tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjUBmkD5S8RCzQvkA3Ongmk8ZpU4URTIhTJgXmEYxcvkp5dWcVgeW4pEcKLDxBMf0Xy0qxVufBAA; __Secure-3PSIDTS=sidts-CjUBmkD5S8RCzQvkA3Ongmk8ZpU4URTIhTJgXmEYxcvkp5dWcVgeW4pEcKLDxBMf0Xy0qxVufBAA; SIDCC=AKEyXzVdql_tirsk6RdZVThvkSBGyUg_OWixDl0cLcfXk2saE7WmHYZg6bZAGsa9_0C1ZiDv_w; __Secure-1PSIDCC=AKEyXzVw-J-g_aFU4Dim1576raCXiD3E5jZAMbevM3ojecSS5K8f7wtKVdMNc8nwds3vX3-p; __Secure-3PSIDCC=AKEyXzVwizJ7kkmB8D6sMOnOdsD5tyACo-ux72RWryCNKhVIEWb_5GEtjEwNLNTnG7MZSn4X; ST-183jmdn=session_logininfo=AFmmF2swRAIgXlMUcosNMhRyTfjSTQx2D67xoPS5hg4qaV5HpNoVM48CIGljaabis0YfX8nu1v0ZRqE2CNHQxiVUgQed0uFUtxXE%3AQUQ3MjNmd1JjR0FUM25uMWpIcFY0c2F3NGNSaGdUVDJkdTRvM3VOT3BRQWk5Mlc2cGhaajdKSlktQTFRNUZrbFNuMmVUbzRuRnBPMmtoemc2STU4QXdRdUY5Tmw3djBrMkdtNEhxNTdpdmduZHZHUkliWXZVcloyRFRJT3cwMFp3OTlkVXJaekJTelZlX1RvWHRfQUhzc1lMSkoxa09LdGp3; YSC=K4pLp6rHc0g; VISITOR_INFO1_LIVE=pTt89rD7gtk; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgRg%3D%3D; __Secure-YNID=12.YT=bCdYGwBGBPqwVD5Z4j43zF5Z1kauhpt3IaRRkkRVxRZWMtIfTTKzte-Gb8JilGhwhT_KdWhkEaVMnQbAFxiE3Goyp_7xMKIZ8azWZ9lrU6uQd2E_60JOUx-Qqxzm9H4Radqf1sARRJ7MSHlYU1zuNqhSthoVGyzXfi8pO7Kyq3DJWzM7LjNjdsL0r-ZhWZ8vwbMY5cBw3IQw85_xlOaEMjbW5eixDxaRdI1lNSmrnrmuMZjZA7nRHaguCAAY2GUUaJjQQmCpjIf_6DQgxxie_g3mAUNni7NBN_aPifIuhpIZIUYipXPkm0_jLfDZnYIBMmw9mCHeijbPRSjfWcENHw; __Secure-ROLLOUT_TOKEN=CNn4wvWrjpaQUBD1k_3gxZaQAxi9jpzjxZaQAw%3D%3D;`;

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
