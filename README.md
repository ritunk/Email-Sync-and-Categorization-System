# Email Sync and Categorization System

## 📌 Overview

This project syncs emails from an IMAP server, categorizes them using Hugging Face AI models, stores them in Elasticsearch, and sends notifications to a Slack channel. The frontend (React.js) provides a user-friendly interface to search and display emails.

---

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js, IMAP, Elasticsearch
- **Frontend**: React.js
- **Database**: Elasticsearch
- **AI Model**: Hugging Face
- **Notifications**: Slack API

---

## 🚀 Features

✅ Fetch emails from IMAP ✅ Store emails in Elasticsearch ✅ Categorize emails using AI (Hugging Face) ✅ Send Slack notifications for important emails ✅ Search emails using Elasticsearch ✅ React-based frontend to display emails

---

## 📂 Project Structure

```
P20/
│── backend/
│   ├── config/  # Configuration files
│   ├── routes/  # API endpoints
│   ├── services/  # Business logic
│   ├── node_modules/
│   ├── server.js  # Main server file
│   ├── package.json  # Backend dependencies
│
│── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/  # Page components
│   │   ├── services/  # API calls
│   │   ├── App.js  # Main App component
│   │   ├── index.js  # Entry point
│   ├── package.json  # Frontend dependencies
│
│── README.md  # Project documentation
```

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/ritunk/YOUR-REPO-NAME.git
cd P20
```

### **2️⃣ Backend Setup**

```sh
cd backend
npm install
```

#### **Environment Variables (backend/.env)**

```env
PORT=5000
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your-email@gmail.com
IMAP_PASS=your-app-password
ELASTICSEARCH_URL=http://localhost:9200
HUGGINGFACE_API_KEY=your-huggingface-api-key
SLACK_BOT_TOKEN=your-slack-bot-token
SLACK_CHANNEL_ID=your-slack-channel-id
```

### **3️⃣ Start the Backend Server**

```sh
node server.js
```

### **4️⃣ Frontend Setup**

```sh
cd ../frontend
npm install
npm start
```

---

## 📊 API Endpoints

### **📌 Email Routes**

| Method | Endpoint                       | Description                    |
| ------ | ------------------------------ | ------------------------------ |
| `GET`  | `/emails/sync-emails`          | Sync emails from IMAP          |
| `GET`  | `/emails/search?query=keyword` | Search emails in Elasticsearch |

---

---

## 🛠️ Troubleshooting

- **IMAP Connection Error**: Check `.env` credentials and enable **Less Secure Apps** in Gmail settings.
- **Hugging Face Model Not Loading**: Try reloading after some time due to API limits.
- **Slack Not Sending Notifications**: Ensure the bot is added to the Slack channel.

---

## 📜 License

This project is licensed under the MIT License.

---

## 📞 Contact

For any issues, open an **Issue** on GitHub or reach out to `ritunk` on GitHub.

🚀 **Happy Coding!** 🎉
