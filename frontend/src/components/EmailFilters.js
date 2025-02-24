import React, { useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";

const EmailFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    account: "",
    folder: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        select
        label="Account"
        name="account"
        value={filters.account}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="">All Accounts</MenuItem>
        <MenuItem value="account1">Account 1</MenuItem>
        <MenuItem value="account2">Account 2</MenuItem>
      </TextField>
      <TextField
        select
        label="Folder"
        name="folder"
        value={filters.folder}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="">All Folders</MenuItem>
        <MenuItem value="inbox">Inbox</MenuItem>
        <MenuItem value="sent">Sent</MenuItem>
        <MenuItem value="spam">Spam</MenuItem>
      </TextField>
    </Box>
  );
};

export default EmailFilters;
