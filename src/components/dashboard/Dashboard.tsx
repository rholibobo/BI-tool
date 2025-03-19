"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import {
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
  ListItemIcon,
  ListItemText,
  IconButton,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
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
  FilterList,
  Refresh,
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
import { COLORS, rows } from "../constants/Constants";
import FinancialDataCardDisplay from "../cards/SummaryCards";
import {
  BudgetRow,
  CardData,
  CategoryData,
  SalesData,
  UserGrowthData,
} from "../interfaces/interface";

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [dropdownArrow, setDropdownArrow] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("year");

  // State for API data
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [budgetRows, setBudgetRows] = useState<BudgetRow[]>([]);
  const [summaryData, setSummaryData] = useState<CardData[]>([]);

  // Loading and error states
  const [loadingSales, setLoadingSales] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBudget, setLoadingBudget] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const [errorSales, setErrorSales] = useState<string | null>(null);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [errorBudget, setErrorBudget] = useState<string | null>(null);
  const [errorSummary, setErrorSummary] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownArrow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    if (isMobile) {
      setMobileOpen(false); // Close drawer on mobile after selection
    }
  };

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

  const baseUrl: string = "https://www.getdata.com";

  // Fetch data functions
  const fetchSalesData = async () => {
    setLoadingSales(true);
    setErrorSales(null);
    try {
      const response = await fetch(
        `${baseUrl}/api/dashboard/sales-trends?period=${selectedPeriod}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }
      const data = await response.json();

      setSalesData(data);
    } catch (error) {
      setErrorSales(
        error instanceof Error ? error.message : "An error occurred"
      );
      console.error("Error fetching sales data:", error);
    } finally {
      setLoadingSales(false);
    }
  };

  const fetchUserGrowthData = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const response = await fetch(`${baseUrl}/api/dashboard/user-growth`);
      if (!response.ok) {
        throw new Error("Failed to fetch user growth data");
      }
      const data = await response.json();

      setUserGrowthData(data);
    } catch (error) {
      setErrorUsers(
        error instanceof Error ? error.message : "An error occurred"
      );
      console.error("Error fetching user growth data:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchCategoryData = async () => {
    setLoadingCategories(true);
    setErrorCategories(null);
    try {
      const response = await fetch(
        `${baseUrl}/api/dashboard/category-distribution`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category data");
      }
      const data = await response.json();

      setCategoryData(data);
    } catch (error) {
      setErrorCategories(
        error instanceof Error ? error.message : "An error occurred"
      );
      console.error("Error fetching category data:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchBudgetData = async () => {
    setLoadingBudget(true);
    setErrorBudget(null);
    try {
      const response = await fetch(
        `${baseUrl}/api/dashboard/budget-details?search=${filterName}&sortBy=${orderBy}&sortOrder=${order}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch budget data");
      }
      const data = await response.json();
      setBudgetRows(data.rows);
    } catch (error) {
      setErrorBudget(
        error instanceof Error ? error.message : "An error occurred"
      );
      console.error("Error fetching budget data:", error);
    } finally {
      setLoadingBudget(false);
    }
  };

  const fetchSummaryData = async () => {
    setLoadingSummary(true);
    setErrorSummary(null);
    try {
      const response = await fetch(`${baseUrl}/api/dashboard/summary`);
      if (!response.ok) {
        throw new Error("Failed to fetch summary data");
      }
      const data = await response.json();

      setSummaryData(data);
    } catch (error) {
      setErrorSummary(
        error instanceof Error ? error.message : "An error occurred"
      );
      console.error("Error fetching summary data:", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  // Fetch all data on initial load
  useEffect(() => {
    fetchSalesData();
    fetchUserGrowthData();
    fetchCategoryData();
    fetchBudgetData();
    fetchSummaryData();
  }, []);

  // Refetch sales data when period changes
  useEffect(() => {
    fetchSalesData();
  }, [selectedPeriod]);

  // Refetch budget data when filter or sort changes
  useEffect(() => {
    fetchBudgetData();
  }, [filterName, orderBy, order]);

  const drawer = (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "16px",
          color: "#4fc3f7",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          height: "auto",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          BI Tool
        </Typography>
      </Box>
      <List sx={{ mt: 2 }}>
        {[
          "Dashboard",
          "States Overview",
          "Budget Planning",
          "Reports",
          "Settings",
          "Logout",
        ].map((text, index) => (
          <ListItemButton
            key={text}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#4fc3f7",
                borderLeft: "4px solid white",
                paddingLeft: "12px",
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
              paddingLeft: "16px",
              borderRadius: "0 8px 8px 0",
              margin: "12px 8px 36px 0",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(79, 195, 247, 0.2)",
              },
            }}
          >
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
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden", // Add this to prevent overflow
        width: "100%", // Ensure the box doesn't exceed viewport width
      }}
      className="bg-[#FCFCFC]"
    >
      {/* Mobile menu button */}
      <Box
        className="mb-8"
        sx={{
          position: "fixed",
          top: "10px",
          left: "20px",
          zIndex: 1200,
          display: { xs: "block", sm: "none" },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            backgroundColor: "#1a2233",
            color: "white",
            "&:hover": {
              backgroundColor: "#4fc3f7",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Sidebar navigation */}
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

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", sm: `calc(100% - 240px)` },
          //   marginLeft: { xs: 0, sm: "240px" },
          overflowX: "hidden", // Add this to prevent horizontal scrolling
        }}
      >
        {/* Header */}
        <Box
          className="flex flex-col md:flex-row justify-between items-start md:items-center bg-transparent rounded-none px-4 md:px-6 py-4 shadow-sm border-b"
          sx={{
            mt: { xs: 4, sm: 0 },
            height: { xs: "auto", md: "96px" },
          }}
        >
          <div className="flex justify-between items-center gap-4 lg:block mb-4 md:mb-0">
            <p className="font-bold text-2xl md:text-3xl">Dashboard</p>
            <div className="flex w-full md:w-auto justify-between items-center gap-4 md:hidden">
              <div className="bg-[#efecec] h-10 w-10 rounded-[50%] flex items-center justify-center">
                <Notifications sx={{ color: "#828282" }} />
              </div>
              <div className="flex justify-center items-center gap-3 bg-[#efecec] rounded-3xl px-3 py-2 w-full md:w-auto">
                <div className="w-10 h-10 bg-gray-300 flex justify-center items-center rounded-full bg-main_grey">
                  <Person sx={{ color: "#828282" }} />
                </div>
                <div className="text-sm">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs font-medium">Administrator</p>
                </div>
                <KeyboardArrowDown sx={{ color: "#828282" }} />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[50%] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="bg-[#efecec] w-full md:w-1/2 flex items-center px-2 py-3 rounded-xl md:hidden lg:flex">
              <Search sx={{ color: "#828282" }} />
              <input
                type="text"
                className="outline-none bg-transparent placeholder:text-sm w-full"
                placeholder="Search"
              />
            </div>
            <div className="hidden md:flex w-full md:w-auto justify-between items-center gap-4">
              <div className="bg-[#efecec] h-10 w-10 rounded-[50%] flex items-center justify-center">
                <Notifications sx={{ color: "#828282" }} />
              </div>
              <div className="flex justify-center items-center gap-3 bg-[#efecec] rounded-3xl px-3 py-2 w-1/2 md:w-auto">
                <div className="w-10 h-10 bg-gray-300 flex justify-center items-center rounded-full bg-main_grey">
                  <Person sx={{ color: "#828282" }} />
                </div>
                <div className="text-sm">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs font-medium">Administrator</p>
                </div>
                <KeyboardArrowDown sx={{ color: "#828282" }} />
              </div>
            </div>
          </div>
        </Box>

        {/* Analytics Overview Header */}
        <div
          className="w-[95%] my-0 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pt-8"
          ref={dropdownRef}
        >
          <div className="mb-4 md:mb-0">
            <p className="font-semibold text-xl md:text-2xl">
              Analytics Overview
            </p>
            <Typography variant="caption" sx={{ color: "blue", mt: 1 }}>
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </div>

          <div className="flex justify-between items-center gap-4 w-full md:w-auto">
            <div className="relative w-1/2 md:w-auto">
              <div
                onClick={() => {
                  displayDropdownArrow();
                }}
                className="flex items-center gap-2 border border-[#DCDCDC] rounded-sm py-3 px-4 cursor-pointer"
              >
                <p className="text-sm">Showing: This year</p>{" "}
                {dropdownArrow ? (
                  <KeyboardArrowUp sx={{ color: "#DCDCDC" }} />
                ) : (
                  <KeyboardArrowDown sx={{ color: "#DCDCDC" }} />
                )}
              </div>
              {dropdownArrow && (
                <div className="top-14 inset-x-0 bg-white py-3 px-4 rounded-md absolute z-50 shadow-box_shadow text-sm w-full">
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
                    <KeyboardArrowDown sx={{ color: "#2F80ED" }} />
                  </div>
                  <div className="flex gap-2 items-center py-3 cursor-pointer">
                    <p className="font-[500]">Custom Date Range</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />

        {/* Main Content */}
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            maxWidth: "100%", // Ensure container doesn't exceed parent width
            overflowX: "hidden", // Prevent horizontal scrolling
          }}
        >
          {/* Summary Cards */}
          <Box sx={{ mt: 4 }}>
            {loadingSummary ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : errorSummary ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorSummary}
              </Alert>
            ) : (
              <FinancialDataCardDisplay data={summaryData} />
            )}
            {!loadingSummary && (
              <IconButton onClick={fetchSummaryData} size="small">
                <Refresh />
              </IconButton>
            )}
          </Box>

          <Box sx={{ mt: 6 }}>
            {/* Line Graph */}
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <p className="text-xl md:text-2xl text-[#273043] font-bold">
                  Sales Trends
                </p>
                {!loadingSales && (
                  <IconButton onClick={fetchSalesData} size="small">
                    <Refresh />
                  </IconButton>
                )}
              </Box>
              {loadingSales ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 4,
                    height: { xs: 200, sm: 300, md: 400 },
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : errorSales ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorSales}
                </Alert>
              ) : (
                <Box sx={{ height: { xs: 300, sm: 400, md: 500 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        stroke="#888888"
                        tick={{ fontSize: 12 }}
                        // Hide Y-axis on mobile to save space
                        hide={isMobile}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                        }}
                        labelStyle={{ fontWeight: "bold", fontSize: "14px" }}
                        itemStyle={{ fontSize: "14px" }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        iconSize={18}
                        wrapperStyle={{
                          paddingTop: 20,
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        // Stack legend items on mobile
                        layout={isMobile ? "vertical" : "horizontal"}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2F80ED"
                        strokeWidth={3}
                        dot={{
                          r: isMobile ? 2 : 4,
                          fill: "#2F80ED",
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: isMobile ? 4 : 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenditure"
                        stroke="#27AE60"
                        strokeWidth={3}
                        dot={{
                          r: isMobile ? 2 : 4,
                          fill: "#27AE60",
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: isMobile ? 4 : 6 }}
                      />
                      {/* Hide less important lines on mobile */}
                      {!isMobile && (
                        <>
                          <Line
                            type="monotone"
                            dataKey="profitMargin"
                            stroke="#FF6347"
                            strokeWidth={3}
                            dot={{
                              r: 4,
                              fill: "#FF6347",
                              stroke: "#fff",
                              strokeWidth: 2,
                            }}
                            activeDot={{ r: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="cac"
                            stroke="#FFC107"
                            strokeWidth={3}
                            dot={{
                              r: 4,
                              fill: "#FFC107",
                              stroke: "#fff",
                              strokeWidth: 2,
                            }}
                            activeDot={{ r: 6 }}
                          />
                        </>
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Paper>

            {/* Bar Chart */}
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <p className="text-xl md:text-2xl text-[#273043] font-bold">
                  User Growth
                </p>
                {!loadingUsers && (
                  <IconButton onClick={fetchUserGrowthData} size="small">
                    <Refresh />
                  </IconButton>
                )}
              </Box>

              {loadingUsers ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 4,
                    height: { xs: 200, sm: 300, md: 400 },
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : errorUsers ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorUsers}
                </Alert>
              ) : (
                <Box sx={{ height: { xs: 300, sm: 400, md: 500 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowthData}>
                      <defs>
                        <linearGradient
                          id="userGrowthGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="5%"
                            stopColor="#27AE60"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2F80ED"
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: "#888888", strokeWidth: 1 }}
                      />
                      <YAxis
                        stroke="#888888"
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: "#888888", strokeWidth: 1 }}
                        // Hide Y-axis on mobile to save space
                        hide={isMobile}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                        }}
                        labelStyle={{ fontWeight: "bold", fontSize: "14px" }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        iconSize={18}
                        wrapperStyle={{
                          paddingTop: 20,
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      />
                      <Bar
                        dataKey="users"
                        fill="url(#userGrowthGradient)"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Paper>

            {/* Pie Chart */}
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <p className="text-xl md:text-2xl text-[#273043] font-bold">
                  Category Distribution
                </p>
                {!loadingCategories && (
                  <IconButton onClick={fetchCategoryData} size="small">
                    <Refresh />
                  </IconButton>
                )}
              </Box>
              {loadingCategories ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 4,
                    height: { xs: 200, sm: 300, md: 400 },
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : errorCategories ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorCategories}
                </Alert>
              ) : (
                <Box sx={{ height: { xs: 300, sm: 400, md: 500 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={isMobile ? 100 : isTablet ? 150 : 200}
                        innerRadius={isMobile ? 35 : isTablet ? 50 : 70}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={1000}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                        }}
                        labelStyle={{ fontWeight: "bold" }}
                        formatter={(value) => `${value} units`}
                      />
                      <Legend
                        verticalAlign="bottom"
                        align="center"
                        layout={isMobile ? "vertical" : "horizontal"}
                        wrapperStyle={{
                          paddingTop: 20,
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Paper>

            {/* Data Table */}
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <p className="text-xl md:text-2xl text-[#273043] font-bold">
                  Sales Details
                </p>
                {!loadingBudget && (
                  <IconButton onClick={fetchBudgetData} size="small">
                    <Refresh />
                  </IconButton>
                )}
              </Box>

              {loadingBudget ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 4,
                    height: { xs: 200, sm: 300, md: 400 },
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : errorBudget ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorBudget}
                </Alert>
              ) : (
                <>
                  {/* Responsive filter input */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "stretch", sm: "center" },
                      gap: 2,
                      mb: 3,
                      mt: 2,
                    }}
                  >
                    <TextField
                      label="Filter by name"
                      variant="outlined"
                      value={filterName}
                      onChange={handleFilterChange}
                      sx={{
                        flex: { xs: "1", sm: "0 0 50%" },
                        maxWidth: { sm: "400px" },
                      }}
                    />
                  </Box>

                  {/* Responsive table */}
                  <TableContainer
                    sx={{
                      overflowX: "auto",
                      maxWidth: "100%", // Add this to ensure it doesn't exceed parent width
                      "&::-webkit-scrollbar": {
                        height: "8px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    <Table sx={{ minWidth: { xs: 500, md: 650 } }}>
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
                              Date Sold
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
                            <TableCell align="right">{row.dateSold}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
