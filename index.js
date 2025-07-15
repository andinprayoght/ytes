import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `SID=g.a000zAjGRaSwnqf097aKa4TcW757STi7rfVkz_jJhPtWqaVB2L6_cQ9STFG6XJ5-Je6LGWyN9QACgYKARYSARMSFQHGX2MipU_lKG83qMurQHF-akoVaBoVAUF8yKr6L1912_nxu7FhkcYeg77b0076; __Secure-1PSID=g.a000zAjGRaSwnqf097aKa4TcW757STi7rfVkz_jJhPtWqaVB2L6_YmWw6TK2f-nZtlBly4maVgACgYKAVkSARMSFQHGX2Mi5YjWxQZ1_Vy0l54ZUi72dRoVAUF8yKqpwjImPizQBOO9Mqh3rBFA0076; __Secure-3PSID=g.a000zAjGRaSwnqf097aKa4TcW757STi7rfVkz_jJhPtWqaVB2L6_wGPON-EScODXqWNQOpOK2QACgYKAWkSARMSFQHGX2MizMOktIclOjvRz5_OuDYerRoVAUF8yKqwTlyzPiWs_33SeuNNnY9T0076; HSID=Aqz3b8sGHH62qaNUL; SSID=Ad-ELWN2lPWgaXjB7; APISID=bha9NRhUUAj1E-Zf/AOOfnf9i_iVH8ism5; SAPISID=AxJtOcvHGikvv7vw/AF1g3sNlafwWJ32vs; __Secure-1PAPISID=AxJtOcvHGikvv7vw/AF1g3sNlafwWJ32vs; __Secure-3PAPISID=AxJtOcvHGikvv7vw/AF1g3sNlafwWJ32vs; GOOGLE_ABUSE_EXEMPTION=ID=27ebd00d6f6e57f5:TM=1752589608:C=r:IP=169.197.85.173-:S=kK5hfinJvKMuwS0RWQ_XBCo; LOGIN_INFO=AFmmF2swRQIhAIMBvd3wgjKod_v-YBukuKfHN3bRcT1tF0-0cZR91zwfAiBG1ERSZAzMX_8-qS2LcJr4D-89LnNLRsFvekoP3O3H3g:QUQ3MjNmeTdXSG5JMzdKSEZfNXhDWWxkNlpiSUZjalA1cjFvQWR6QThrWmtRTUxuT1g5WFpZZzJzQXZVZklCVWFnam9teGhOZHdZOFhCRnZZSnVRdUwxbTc3VDNlZkx6UzkwREpyX2lXcnpuQ3luVXNNN3hiemdGcl91SXBGbm4zRnNVQlhIQThURENLNzhyM1NGcDJyMXdwR1IxemxlMGh3; PREF=tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjIB5H03P51L5N3qRBGpncQqSGalYIDVQH1MZxxygT72Twqhp9FWdNA9-NzQTfpIBuXzfhAA; __Secure-3PSIDTS=sidts-CjIB5H03P51L5N3qRBGpncQqSGalYIDVQH1MZxxygT72Twqhp9FWdNA9-NzQTfpIBuXzfhAA; SIDCC=AKEyXzW5WMfFnnJVPz7ZDOvP9ppbpiWNHsbbrKNyNYCU9Fag0_jLLAcIIAFvLNs3K2HY7j_V7g; __Secure-1PSIDCC=AKEyXzVtbppxdAqRC59cJonMDXU4F0nGsdhJnR9n65h62YriQpMAQSxxo3zrIz0Y3FhsAFmU9g; __Secure-3PSIDCC=AKEyXzU6_DAUFm3iPsT_XtolJozNBzW6qziHshGXnmTxfgEHyglakB3Q2pVth7Lm3Icqb2kexQ; YSC=IcMzgj0y450; VISITOR_INFO1_LIVE=LDkDABHb0EQ; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgEg%3D%3D; __Secure-ROLLOUT_TOKEN=CJv3lMHHtJSeiwEQhI7NpIm_jgMY15y2pom_jgM%3D;`;

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
