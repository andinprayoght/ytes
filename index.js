import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `GPS=1; __Secure-3PSID=g.a0001wjGRSIbGPcCO0LDXm8UeJZ1_tb9XQqnXwYcGI3oCSvLLVgXjZKC1Lrsyk0KSCoRnw4WdgACgYKAaQSARMSFQHGX2MiKhcbo7lbkLaUllUTDz60rRoVAUF8yKrCBeaspgoE6hcAg02p-ZFx0076; __Secure-3PAPISID=nhE2iu__f62Jipen/AJ3xcG_TUhkzGX8DU; PREF=tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjUBmkD5S0YX6Oqf12ANMBbt74YcMDjWJnOUKopN3Vnp5WZ5zFH-Sz6xx_R1t1JcrkPBTNerQxAA; __Secure-3PSIDTS=sidts-CjUBmkD5S0YX6Oqf12ANMBbt74YcMDjWJnOUKopN3Vnp5WZ5zFH-Sz6xx_R1t1JcrkPBTNerQxAA; HSID=AD99_1cYhFHM4Q9yt; SSID=A1NBxjp2dAi7n0d2w; APISID=OyvWypwQjYIwLb8Y/Al7b084x8y8-WQAK4; SAPISID=nhE2iu__f62Jipen/AJ3xcG_TUhkzGX8DU; __Secure-1PAPISID=nhE2iu__f62Jipen/AJ3xcG_TUhkzGX8DU; SID=g.a0001wjGRSIbGPcCO0LDXm8UeJZ1_tb9XQqnXwYcGI3oCSvLLVgXBO2_pVe9VB9Hhonxm0tUOAACgYKARsSARMSFQHGX2MiSYxxpfW4T_b3xCHxIq0ZWRoVAUF8yKooTIa95_XcI-HkDDxYWqia0076; __Secure-1PSID=g.a0001wjGRSIbGPcCO0LDXm8UeJZ1_tb9XQqnXwYcGI3oCSvLLVgXvY0uQcxQJ4NiPPHcpxWTAwACgYKATMSARMSFQHGX2Mi3zRyTrQjoqyzFSLmiaoC-RoVAUF8yKot6moglyu55kKMhHtpMxdG0076; LOGIN_INFO=AFmmF2swRgIhAP6t4jKmoQpB8xsbtAMZnazK4cXkOiKwIQNIsYkpiYo8AiEAsWTq7idkyonh2v2_OWpIn6zGI7CSvoD_Aea1mA8rQoY:QUQ3MjNmelM1eDM5X2w5ajBmT0xYZjVFaDNYVERFX2JsQ2FzVDJIS3BwaDB2QzRRaGRxR21uN0REMWRZYkFVOGl4OW1LR2NGa0JnUVdpY2dxT2V2bmtIM1h3X0lNdDlIaG8tOVNRVV9DLVJjM254aV9Tb2F2UlRsNWt4dFQtOFRibXgyLVRZVHhJVXN3Q29EUkFmNTBRTG1rYXpUaDZBQ213; SIDCC=AKEyXzUwbUu6aQS8pKfEifOuEwqdMG2OQN8CBp6_-11LkgsRuC0zfZgJCfqZP9ot8xE8EPZTkg; __Secure-1PSIDCC=AKEyXzUzPLrwqYhNY9Tn9opXcwbTRWUN6lgaWvnm11QtC01CTsdMh9JGLW5_t08eAoN0TeFs; __Secure-3PSIDCC=AKEyXzVHl970rckxnb_DYQnDyc9wvS75lU2tO4860GF3E8DKRbe5XrBR0huQw1DV1zgGRqIZAQ; YSC=6VOAPoAJ6bA; VISITOR_INFO1_LIVE=EeAaccyyVMk; VISITOR_PRIVACY_METADATA=CgJBVRIEGgAgJg%3D%3D; __Secure-ROLLOUT_TOKEN=CLfv0pKYprK9eBDJwoes6PqPAxikooaw6PqPAw%3D%3D;`;

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
