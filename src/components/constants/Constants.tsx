export const salesData = [
  { name: "Jan", revenue: 4000, expenditure: 2400 },
  { name: "Feb", revenue: 3000, expenditure: 1398 },
  { name: "Mar", revenue: 2000, expenditure: 9800 },
  { name: "Apr", revenue: 2780, expenditure: 3908 },
  { name: "May", revenue: 1890, expenditure: 4800 },
  { name: "Jun", revenue: 2390, expenditure: 3800 },
];

export const userGrowthData = [
  { name: "Q1", users: 4000 },
  { name: "Q2", users: 3000 },
  { name: "Q3", users: 2000 },
  { name: "Q4", users: 2780 },
];

export const categoryDistributionData = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 300 },
  { name: "Category D", value: 200 },
];

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export const createData = (name: string, amount: number, dateModified: string, status: string) => {
  return { name, amount, dateModified, status }
}

export const rows = [
  createData("Teachers", 3466136333.98, "26/09/2024", "Approved"),
  createData("Administrative", 3466136333.98, "26/09/2024", "Under Review"),
  createData("Academic Staff", 3466136333.98, "26/09/2024", "Rejected"),
  createData("Other Educational Staff", 3466136333.98, "26/09/2024", "Approved"),
  createData("Social Welfare", 3466136333.98, "26/09/2024", "Approved"),
]