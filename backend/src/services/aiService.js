const categorizeEmail = (emailText) => {
  if (emailText.includes("meeting")) return "Meeting Booked";
  if (emailText.includes("not interested")) return "Not Interested";
  if (emailText.includes("spam")) return "Spam";
  if (emailText.includes("out of office")) return "Out of Office";
  return "Interested";
};

module.exports = { categorizeEmail };
