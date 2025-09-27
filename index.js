import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `__Secure-3PSID=g.a0001wjGReCBuCzISfJrj7So46hDzYgB_tW0Tb8wf1gNAZI_RZ3R0_0o5ND-YH0agwfDpyz8tQACgYKAYMSARMSFQHGX2MiQgft88gcsbcT8U88xRx90BoVAUF8yKotQw6uieIdgmI_8N6WAf7Y0076; __Secure-3PAPISID=vQv3Ymvkm81j8TUp/A0v2x-OZAdq-8Tzz0; GPS=1; __Secure-1PSIDTS=sidts-CjUBmkD5S9EBUshzw4BPzawlISpEtfsXiIGtOC1JHelerGTOvebcV9FqMAnBMQTxW3DembqechAA; __Secure-3PSIDTS=sidts-CjUBmkD5S9EBUshzw4BPzawlISpEtfsXiIGtOC1JHelerGTOvebcV9FqMAnBMQTxW3DembqechAA; PREF=tz=Asia.Jakarta; LOGIN_INFO=AFmmF2swRAIgBA4z_NlvlsJGTwiwqv9ljuXF2nXaezffTzNdXkz5YBUCIArFzSpOVX0F1KDa5nqCpfondOK84ToS-utyr3vxJ-tq:QUQ3MjNmd1pvSjZpVjd1cVNob0JjVkRGRHpHSE9ITnduWS1YTzhvZEZfenY1V0dUUkZsWnlackVYWnVSOXpOQUZoR0hIVXdXaHJYQlVtQi03THFNMEpNRzdZektWb0VnNXQydnp1YkFBSTl6Q1N3a0pQUm12R3BvT0tPYUZVNU5hOU8taGFYRWI3N3B3X0l3RlktT0UxNnRHSGpCRHhOV3ln; __Secure-3PSIDCC=AKEyXzXYcfRIDtDZx2wSIVTjJW1Hoyp7DD58WOisoUa50Nro9E-dhdhuzDAKW3Yx3FDUW57fJA; ST-183jmdn=session_logininfo=AFmmF2swRAIgBA4z_NlvlsJGTwiwqv9ljuXF2nXaezffTzNdXkz5YBUCIArFzSpOVX0F1KDa5nqCpfondOK84ToS-utyr3vxJ-tq%3AQUQ3MjNmd1pvSjZpVjd1cVNob0JjVkRGRHpHSE9ITnduWS1YTzhvZEZfenY1V0dUUkZsWnlackVYWnVSOXpOQUZoR0hIVXdXaHJYQlVtQi03THFNMEpNRzdZektWb0VnNXQydnp1YkFBSTl6Q1N3a0pQUm12R3BvT0tPYUZVNU5hOU8taGFYRWI3N3B3X0l3RlktT0UxNnRHSGpCRHhOV3ln; YSC=AJllBlwdGtE; VISITOR_INFO1_LIVE=4wUMae48ln0; VISITOR_PRIVACY_METADATA=CgJBVRIEGgAgEQ%3D%3D; __Secure-YNID=12.YT=B_rz--iu1gmqm4uopK_zN4X3nrR2OeO7yT6-3EZeP520ZW2XjmpW_OucP_1fevBnd5asdx8lnLuys_9D_R9165clNvXYCztWJA_uOBb6gWGZgMCkq72Tq5a_zXidD6POjkF_i2R5ttQ_Wkt2AOo-5yYLnxFGlN6-g-Sm5Ciu5zGgmODmiS7Z9blx8JY-krgOJDOhN507i_b7zHAntjXYuMcTYUFxJIieGyv9fN3ovh9lp89EAEsjkzLIQNVFdUtdxc5TTwvjUvv52hjpS-x9CuXQxntnKEDkvLn7lV8BOkqy71uPAUCluvXrbRu-qznAbDUA273kAgBEpPtVMtsXwA; __Secure-ROLLOUT_TOKEN=CIjgyKzN5ImiGBDp7PPcpPiPAxjBvaLfpPiPAw%3D%3D;`;

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
