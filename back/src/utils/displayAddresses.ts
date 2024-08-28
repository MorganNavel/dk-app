import os from "os";

function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === "IPv4" && !net.internal) {
        addresses.push(net.address);
      }
    }
  }

  return addresses;
}

export function displayApiAddresses() {
  const environment = process.env.NODE_ENV || "development";
  const port = process.env.PORT || 3001;
  const addresses = getNetworkAddresses();

  console.log(`API is running in ${environment} mode.\n`);
  console.log("Accessible addresses:");
  if (environment === "production") {
    addresses.forEach((address) => {
      console.log(`- http://${address}:${port}`);
    });
  } else {
    console.log(`- http://localhost:${port}`);
    addresses.forEach((address) => {
      console.log(`- http://${address}:${port}`);
    });
  }
}

displayApiAddresses();
