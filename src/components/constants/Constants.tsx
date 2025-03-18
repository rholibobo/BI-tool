export const salesData = [
    { name: "Jan", revenue: 4000, expenditure: 2500, profitMargin: 37.5, cac: 50 },
    { name: "Feb", revenue: 4500, expenditure: 2800, profitMargin: 38.4, cac: 52 },
    { name: "Mar", revenue: 5000, expenditure: 3000, profitMargin: 40, cac: 55 },
    { name: "Apr", revenue: 5300, expenditure: 3100, profitMargin: 41.5, cac: 53 },
    { name: "May", revenue: 5500, expenditure: 3300, profitMargin: 40.9, cac: 51 },
    { name: "Jun", revenue: 2000, expenditure: 3500, profitMargin: 41.7, cac: 50 },
    { name: "Jul", revenue: 6500, expenditure: 3700, profitMargin: 42.3, cac: 49 },
    { name: "Aug", revenue: 3000, expenditure: 3900, profitMargin: 43, cac: 48 },
    { name: "Sep", revenue: 7500, expenditure: 4200, profitMargin: 44, cac: 47 },
    { name: "Oct", revenue: 8000, expenditure: 4400, profitMargin: 44.5, cac: 46 },
    { name: "Nov", revenue: 8500, expenditure: 4600, profitMargin: 45, cac: 45 },
    { name: "Dec", revenue: 4000, expenditure: 4800, profitMargin: 46.7, cac: 44 },
  ];

  export const userGrowthData = [
    { name: "Jan", users: 4000 },
    { name: "Feb", users: 3500 },
    { name: "Mar", users: 3000 },
    { name: "Apr", users: 4500 },
    { name: "May", users: 5000 },
    { name: "Jun", users: 6000 },
    { name: "Jul", users: 7000 },
    { name: "Aug", users: 7500 },
    { name: "Sep", users: 8200 },
    { name: "Oct", users: 8500 },
    { name: "Nov", users: 9000 },
    { name: "Dec", users: 9500 },
  ];

export const categoryDistributionData = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 300 },
  { name: "Category D", value: 200 },
];

export const COLORS = ["#2F80ED", "#56CCF2", "#27AE60", "#FF8042"]

export const createData = (name: string, amount: number, dateSold: string, status: string) => {
  return { name, amount, dateSold, status }
}

export const rows = [
    createData("Apple iPhone 13", 1200, "2025-03-01", "Completed"),
    createData("Samsung Galaxy S21", 1100, "2025-03-05", "Pending"),
    createData("Sony PlayStation 5", 499, "2025-03-10", "Completed"),
    createData("Dell XPS 13", 1500, "2025-03-15", "In Progress"),
    createData("Apple MacBook Pro", 2500, "2025-03-20", "Completed"),
    createData("Bose QuietComfort 35", 299, "2025-03-25", "Completed"),
    createData("Nintendo Switch", 299, "2025-03-30", "In Progress"),
    createData("Google Pixel 6", 899, "2025-04-02", "Completed"),
]



export const CardDisplayData = [
    {
      title: "Total Users",
      amount: 1438960,
      percentage: 10,
      note: "Year to Date",
    },
    {
      title: "Active Sessions",
      amount: 60075,
      percentage: 15,
      note: "Year to Date",
    },
    {
      title: "Sales Revenue",
      amount: 50000000,
      percentage: 6,
      note: "Year to Date",
    },
    {
      title: "Total Expenditure",
      amount: 1000756000,
      percentage: 25,
      note: "Year to Date",
    },
  ];