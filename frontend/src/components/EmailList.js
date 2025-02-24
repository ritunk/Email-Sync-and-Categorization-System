import React from "react";

const EmailList = ({ emails }) => {
  return (
    <div className="email-list">
      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        emails.map((email, index) => (
          <div key={index} className="email-item">
            <h3>{email.subject}</h3>
            <p>
              <strong>From:</strong> {email.from}
            </p>
            <p>
              <strong>Category:</strong> {email.category}
            </p>
            <p>{email.text}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default EmailList;
