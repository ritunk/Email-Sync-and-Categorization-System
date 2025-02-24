const express = require("express");
const { fetchEmails } = require("../services/emailService");
const client = require("../config/elastic");
const { categorizeEmail } = require("../services/aiService");

const router = express.Router();

// Fetch and store emails
router.get("/sync-emails", async (req, res) => {
  try {
    await fetchEmails();
    res.json({ message: "✅ Email sync complete" });
  } catch (err) {
    console.error("❌ Error syncing emails:", err);
    res.status(500).json({ error: "Email sync failed" });
  }
});

// // Search emails in Elasticsearch
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const { hits } = await client.search({
      index: "emails",
      query: {
        match: { body: query },
      },
    });

    // Categorize each email using AI
    const results = await Promise.all(
      hits.hits.map(async (hit) => ({
        subject: hit._source.subject,
        from: hit._source.from,
        text: hit._source.body,
        category: await categorizeEmail(hit._source.body),
      }))
    );

    res.json(results);
  } catch (err) {
    console.error("❌ Error searching emails:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
