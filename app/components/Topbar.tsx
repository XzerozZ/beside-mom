import React from "react";
import { TextField, Button, Select, MenuItem, Box } from "@mui/material";

interface TopBarSectionProps {
  title: string;
  searchTerm: string;
  filterBy: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onAddClick: () => void;
}

const TopBarSection: React.FC<TopBarSectionProps> = ({
  title,
  searchTerm,
  filterBy,
  onSearchChange,
  onFilterChange,
  onAddClick,
}) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-neutral05 font-bold">{title}</h1>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="ค้นหา"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flexGrow: 1 }}
        />

        <Select
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">จัดเรียงตาม</MenuItem>
        </Select>

        <Button
          variant="contained"
          onClick={onAddClick}
          sx={{
            backgroundColor: "#B36868",
            "&:hover": { backgroundColor: "#965757" },
          }}
        >
          + เพิ่มคุณแม่
        </Button>
      </Box>
    </div>
  );
};
export default TopBarSection;
