const imaps = require("imap-simple");
require("dotenv").config();

const imapConfig = {
  imap: {
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: process.env.IMAP_PORT,
    tls: true,
    authTimeout: 3000,
  },
};

const connectImap = async () => {
  try {
    const connection = await imaps.connect(imapConfig);
    console.log("✅ IMAP connected");
    return connection;
  } catch (error) {
    console.error("❌ IMAP connection error:", error);
  }
};

module.exports = connectImap;
