import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Paste cookie kamu dalam format 1 baris di sini:
const cookieHeader = `GPS=1; SID=g.a000zAjGRdjD_zbcRjHvrY9PMWMEqE8QwhMJ36HvFheeyFW8CuyloljrVdVpLdn6EYjcHbqX9QACgYKASISARMSFQHGX2Mi389Kk-buuCcmjAXZKSS9ohoVAUF8yKoDexzjBGyqHuyhwvp-Bx2K0076; __Secure-1PSID=g.a000zAjGRdjD_zbcRjHvrY9PMWMEqE8QwhMJ36HvFheeyFW8CuylLo1Pb80fNpFv04tJBsLDEwACgYKAQcSARMSFQHGX2Mi9HkM_eIneGitTnm9c8xerBoVAUF8yKoi55I4unxa-ZUXYlFd8d4Y0076; __Secure-3PSID=g.a000zAjGRdjD_zbcRjHvrY9PMWMEqE8QwhMJ36HvFheeyFW8Cuyl_qUr-hY0J1-aTTqPzYO-oAACgYKASQSARMSFQHGX2MiqBNIZVry_mGSYmuVGIaa-BoVAUF8yKpu35nN0VBLOJ8hxVF06e8P0076; HSID=Acw5qlaw5YjW2E0cV; SSID=AvJNMGF9msd7M6tqz; APISID=gqKPiTpUl_TLrT44/Ax17PHfS-_DRIxlXc; SAPISID=raRncLTHKjNBbCgB/AgRxTwnaHDtexfqZI; __Secure-1PAPISID=raRncLTHKjNBbCgB/AgRxTwnaHDtexfqZI; __Secure-3PAPISID=raRncLTHKjNBbCgB/AgRxTwnaHDtexfqZI; PREF=tz=Asia.Jakarta; __Secure-1PSIDTS=sidts-CjEB5H03P6Rv_8KgxP0NRcSeQk-oPPR0ROOdRwiRjFch9eJmaVY76lbPIGTrhD4xePfiEAA; __Secure-3PSIDTS=sidts-CjEB5H03P6Rv_8KgxP0NRcSeQk-oPPR0ROOdRwiRjFch9eJmaVY76lbPIGTrhD4xePfiEAA; LOGIN_INFO=AFmmF2swRgIhAPPvHODmEbAVsjoZvnnHUw0ie6Keqi3pedQ8-_TvW6TQAiEA4_YiPfWgpBCaHBdgt7XPtyB18WJBsTRNAeRe-WVH2rM:QUQ3MjNmeFA5Ylk1NHZ2VnhQeUdDcjBkRVl0ZXJyOTNJTFMwTERkTWliT25IVlR4TmNTeVUwSTE4Zk9jaDA1Z0dIbnN3Y2c5aUZWSHRTY0lFZERBMlhhRWFtYjZCRHIyeERNZl93ZUNWOXh3YkVCOWxLS1hQYXhaWHRDeWcyQTFwNVRVbkxrNC1HZDQ0RmZ0UXF3WGtUR3ZENHFRWVc4QmNn; CONSISTENCY=AKreu9vhXEIYaTQi6wY1i_n4aj8mC9mQtrqkM60L7UOANBDGN-IJOsZSP-iLtyq9wHsju4gwdeCYVLyvnzPilxPK_iNLJbHf26rWiQKpsxQurz8A9NIkV4-I7j_m2sVajjPFyX4ozHiWi4RPdNqiJqD4ABrAYBdUjKcu7C61DcS4hQ; SIDCC=AKEyXzV8HtCRrx0hTxs6joFfrbEPtXwaYh-DcMKbKMj9zKSsb0rYJgxxoq6MZdK5Sjr6NLNfVA; __Secure-1PSIDCC=AKEyXzV_gUM7ySn8Dh9abzZqw_S5v-GrvjFfK1_PRpobzPUObRpVjT8LCrFswfFykpd4bukG; __Secure-3PSIDCC=AKEyXzUfGecoUU7-mhS_4mJsSjgf7KuLKp7VX7Y1zOHEIdLAhzOGNCCsD_6Y6Obwqlk6IDG9rw; ST-183jmdn=session_logininfo=AFmmF2swRgIhAPPvHODmEbAVsjoZvnnHUw0ie6Keqi3pedQ8-_TvW6TQAiEA4_YiPfWgpBCaHBdgt7XPtyB18WJBsTRNAeRe-WVH2rM%3AQUQ3MjNmeFA5Ylk1NHZ2VnhQeUdDcjBkRVl0ZXJyOTNJTFMwTERkTWliT25IVlR4TmNTeVUwSTE4Zk9jaDA1Z0dIbnN3Y2c5aUZWSHRTY0lFZERBMlhhRWFtYjZCRHIyeERNZl93ZUNWOXh3YkVCOWxLS1hQYXhaWHRDeWcyQTFwNVRVbkxrNC1HZDQ0RmZ0UXF3WGtUR3ZENHFRWVc4QmNn; __Secure-ROLLOUT_TOKEN=CI-trOXE-uO7xwEQhKPXh_ugjgMYuIbw0aW-jgM%3D; YSC=sxrcZlLVtLk; VISITOR_INFO1_LIVE=J5ZcI4z67oU; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgOw%3D%3D;`;

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