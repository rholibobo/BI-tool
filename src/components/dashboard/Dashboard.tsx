"use client";

import type React from "react";
import { useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  Assessment,
  AccountBalance,
  Description,
  Settings,
  ExitToApp,
  Menu as MenuIcon,
  Search,
  Notifications,
  Person,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import {
  categoryDistributionData,
  COLORS,
  rows,
  salesData,
  userGrowthData,
} from "../constants/Constants";

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [dropdownArrow, setDropdownArrow] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayDropdownArrow = () => {
    setDropdownArrow((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (orderBy === "amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    return order === "asc"
      ? a[orderBy as keyof typeof a] < b[orderBy as keyof typeof b]
        ? -1
        : 1
      : b[orderBy as keyof typeof b] < a[orderBy as keyof typeof a]
      ? -1
      : 1;
  });

  function formatTodaysDate(): string {
    const today = new Date();
    
    // Get day, month, and year components
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
}

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[
          "Dashboard",
          "States Overview",
          "Budget Planning",
          "Reports",
          "Settings",
          "Logout",
        ].map((text, index) => (
          <ListItem component="li" key={text}>
            <ListItemIcon>
              {index === 0 ? (
                <DashboardIcon />
              ) : index === 1 ? (
                <Assessment />
              ) : index === 2 ? (
                <AccountBalance />
              ) : index === 3 ? (
                <Description />
              ) : index === 4 ? (
                <Settings />
              ) : (
                <ExitToApp />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }} className="bg-[#FCFCFC]">
      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main">
        <Box className="flex justify-between items-center bg-transparent h-24 rounded-none px-6 shadow-md border-b">
          <div>
            <p className="font-semibold text-lg">Dashboard</p>
            {formatTodaysDate()}
          </div>

          <div className="w-[50%] flex justify-between items-center gap-4">
            <div className="bg-[#efecec] w-1/2 flex items-center px-2 py-3 rounded-xl">
              <Search sx={{color: "#828282"}} />

              <input
                type="text"
                className="outline-none bg-transparent placeholder:text-sm"
                placeholder="Search"
              />
            </div>
            <div className="bg-[#efecec] h-10 w-10 rounded-[50%] flex items-center justify-center">
              <Notifications sx={{color: "#828282"}} />
            </div>
            <div className="flex justify-center items-center gap-3 bg-[#efecec] rounded-3xl px-3 py-2">
              <div className="w-10 h-10 bg-gray-300 flex justify-center items-center rounded-full bg-main_grey">
                <Person sx={{color: "#828282"}} />
              </div>

              <div className=" text-sm">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs font-medium">Administrator</p>
              </div>

              <KeyboardArrowDown sx={{color:"#828282"}} />
            </div>
          </div>
        </Box>

        <div
          className="w-[95%] my-0 mx-auto flex justify-between items-center pt-8"
          ref={dropdownRef}
        >
          <p className="font-semibold text-2xl">
            Analytics Overview
          </p>

          <div className="flex justify-between items-center gap-4">
            <div className="relative">
              <div
                onClick={() => {
                  displayDropdownArrow();  
                }}
                className="flex items-center gap-2 border border-[#DCDCDC] rounded-sm py-3 px-4 cursor-pointer"
              >
                <p className="">Showing: This year</p>{" "}
                {dropdownArrow ? (
                  <KeyboardArrowUp  sx={{color:"#DCDCDC"}} />
                ) : (
                  <KeyboardArrowDown sx={{color:"#DCDCDC"}} />
                )}
              </div>
              {dropdownArrow && (
                <div className="top-14 inset-x-0 bg-white py-3 px-4 rounded-rounded_4 absolute z-50 shadow-box_shadow text-sm">
                  <div className="flex gap-2 items-center py-3 border-b border-[#F2F2F2] cursor-pointer">
                    <input type="radio" className="w-4 h-4" />
                    <p className="font-[500]">This Month</p>
                  </div>
                  <div className="flex gap-2 items-center py-3 border-b border-b-[#F2F2F2] cursor-pointer">
                    <input type="radio" className="w-4 h-4" />
                    <p className="font-[500]">Year to Date</p>
                  </div>
                  <div className="flex gap-2 items-center py-3 border-b border-b-[#F2F2F2] cursor-pointer">
                    <input type="radio" className="w-4 h-4" />
                    <p className="font-[500]">This Year</p>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-b-[#F2F2F2] cursor-pointer">
                    <p className="font-[500]">Quarterly</p>
                    <KeyboardArrowDown sx={{color:"#2F80ED"}} />
                  </div>
                  <div className="flex gap-2 items-center py-3  cursor-pointer">
                    <p className="font-[500]">
                      Custom Date Range
                    </p>
                  </div>
                </div>
              )}
            </div>

            
          </div>
        </div>
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Metrics Summary */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Total Users
                </Typography>
                <Typography component="p" variant="h4">
                  1,000,000
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Active Sessions
                </Typography>
                <Typography component="p" variant="h4">
                  50,000
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Sales Revenue
                </Typography>
                <Typography component="p" variant="h4">
                  $500,000
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Total State Expenditure
                </Typography>
                <Typography component="p" variant="h4">
                  $400,000
                </Typography>
              </Paper>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Sales Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <Line
                      type="monotone"
                      dataKey="expenditure"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  User Growth
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Category Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Data Table */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Budget Details
                </Typography>
                <TextField
                  label="Filter by name"
                  variant="outlined"
                  value={filterName}
                  onChange={handleFilterChange}
                  sx={{ mb: 2 }}
                />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "name"}
                            direction={orderBy === "name" ? order : "asc"}
                            onClick={() => handleRequestSort("name")}
                          >
                            Budget Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel
                            active={orderBy === "amount"}
                            direction={orderBy === "amount" ? order : "asc"}
                            onClick={() => handleRequestSort("amount")}
                          >
                            Amount
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel
                            active={orderBy === "dateModified"}
                            direction={
                              orderBy === "dateModified" ? order : "asc"
                            }
                            onClick={() => handleRequestSort("dateModified")}
                          >
                            Date Modified
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel
                            active={orderBy === "status"}
                            direction={orderBy === "status" ? order : "asc"}
                            onClick={() => handleRequestSort("status")}
                          >
                            Status
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedRows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </TableCell>
                          <TableCell align="right">
                            {row.dateModified}
                          </TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
