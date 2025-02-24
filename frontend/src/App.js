import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailList from "./components/EmailList";
import SearchBar from "./components/SearchBar";

function App() {
  const [emails, setEmails] = useState([]);
  const [query, setQuery] = useState("");

  // Function to fetch emails from backend search API
  const fetchEmails = async (searchQuery = "") => {
    try {
      const response = await axios.get(
        `/emails/search?query=${encodeURIComponent(searchQuery)}`
      );
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmails(query);
  };

  // On component mount, fetch all emails (or initial emails)
  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="app-container">
      <h1>Email Aggregator</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <EmailList emails={emails} />
    </div>
  );
}

export default App;
