import fetch from 'node-fetch';// Importing node-fetch

async function fetchIPAddress(domain) {
  try {
    const resp = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
      {
        headers: {
          accept: "application/dns-json",
        },
      },
    );

    const respObject = await resp.json();

    if (respObject.Answer && respObject.Answer[0] && respObject.Answer[0].data) {
      const data = respObject.Answer[0].data;
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error in fetchIPAddress:", error.message);
    return null;
  }
}

// don't touch below this line

const domain = "siddhaai-demo-api.blueswype.in";
fetchIPAddress(domain)
  .then(ipAddress => {
    if (!ipAddress) {
      console.log("Something went wrong in fetchIPAddress");
    } else {
      console.log(`Found IP address for domain ${domain}: ${ipAddress}`);
    }
  })
  .catch(error => {
    console.error("Error:", error.message);
  });
