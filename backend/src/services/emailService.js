const Imap = require("imap");
const { simpleParser } = require("mailparser");
const { Client } = require("@elastic/elasticsearch");
const { WebClient } = require("@slack/web-api");
require("dotenv").config();

// Initialize Elasticsearch client
const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });

// Initialize Slack client
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// IMAP Configuration
const imap = new Imap({
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASS,
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  authTimeout: 10000,
});

// Function to send Slack notifications
async function sendSlackNotification(email) {
  await slackClient.conversations.join({
    channel: process.env.SLACK_CHANNEL_ID,
  });

  try {
    if (!email.subject || !email.from || !email.text) {
      console.warn("⚠️ Missing email details. Skipping Slack notification.");
      return;
    }

    await slackClient.chat.postMessage({
      channel: process.env.SLACK_CHANNEL_ID,
      text: `📧 *New Email Received* \n\n*Subject:* ${
        email.subject
      } \n*From:* ${email.from.text} \n*Preview:* ${email.text.substring(
        0,
        200
      )}...`,
    });

    console.log(`✅ Sent Slack notification: ${email.subject}`);
  } catch (err) {
    console.error("❌ Error sending Slack notification:", err);
  }
}

// Function to store email in Elasticsearch
async function storeEmailInElasticsearch(email) {
  try {
    await esClient.index({
      index: "emails",
      document: {
        from: email.from.text,
        to: email.to?.text || "N/A",
        subject: email.subject,
        body: email.text,
        date: email.date,
      },
    });

    console.log(`✅ Stored email: ${email.subject}`);

    // Send Slack notification for specific emails
    await sendSlackNotification(email);
  } catch (err) {
    console.error("❌ Error storing email in Elasticsearch:", err);
  }
}

// Function to fetch and process emails
function fetchEmails() {
  return new Promise((resolve, reject) => {
    imap.once("ready", () => {
      console.log("✅ IMAP Connection Ready");

      imap.openBox("INBOX", false, async (err, box) => {
        if (err) {
          reject(err);
          return;
        }

        const fetch = imap.seq.fetch(
          `${Math.max(1, box.messages.total - 30)}:*`,
          {
            bodies: "",
          }
        );

        fetch.on("message", (msg, seqno) => {
          msg.on("body", async (stream, info) => {
            try {
              const email = await simpleParser(stream);
              await storeEmailInElasticsearch(email);
            } catch (err) {
              console.error("❌ Error processing email:", err);
            }
          });
        });

        fetch.once("end", () => {
          imap.end();
          console.log("✅ Email fetch complete");
          resolve();
        });
      });
    });

    imap.once("error", (err) => {
      console.error("❌ IMAP connection error:", err);
      reject(err);
    });

    imap.connect(); // Connect to IMAP server
  });
}

module.exports = { fetchEmails };
