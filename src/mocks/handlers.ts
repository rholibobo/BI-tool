import { http, HttpResponse, delay } from "msw"
import { categoryDistributionData, rows, salesData, userGrowthData } from "../components/constants/Constants"


export const handlers = [
  // Line Chart Data API
  http.get("/api/dashboard/sales-trends", async ({ request }) => {
    const url = new URL(request.url)
    const period = url.searchParams.get("period") || "year"

    // You could return different data based on the period
    let data = [...salesData]

    if (period === "month") {
      // Return only last 30 days data
      data = data.slice(-3)
    } else if (period === "quarter") {
      // Return quarterly data
      data = data.slice(-4)
    }

    await delay(800)
    return HttpResponse.json(data)
  }),

  // Bar Chart Data API
  http.get("/api/dashboard/user-growth", async ({ request }) => {
    const url = new URL(request.url)
    const year = url.searchParams.get("year") || "current"

    // Could return different data based on the year
    await delay(600)
    return HttpResponse.json(userGrowthData)
  }),

  // Pie Chart Data API
  http.get("/api/dashboard/category-distribution", async () => {
    await delay(700)
    return HttpResponse.json(categoryDistributionData)
  }),

  // Table Data API
  http.get("/api/dashboard/budget-details", async ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get("search") || ""
    const sortBy = url.searchParams.get("sortBy") || "name"
    const sortOrder = url.searchParams.get("sortOrder") || "asc"

    // Filter rows based on search query
    let filteredRows = [...rows]
    if (search) {
    filteredRows = rows.filter((row: { name: string }) => row.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Sort rows
    filteredRows.sort((a, b) => {
      if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }

      // Sort by string properties
      const aValue = String(a[sortBy as keyof typeof a])
      const bValue = String(b[sortBy as keyof typeof b])

      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

    await delay(500)
    return HttpResponse.json({
      rows: filteredRows,
      total: rows.length,
      filtered: filteredRows.length,
    })
  }),

  // Summary Cards Data API
  http.get("/api/dashboard/summary", async () => {
    const summaryData = [
      {
        title: "Total Funds Allocated",
        value: "$1,438,967,020",
        percentageChange: 60,
        description: "Utilized",
      },
      {
        title: "Funds Utilized",
        value: "$13,048,000",
        percentageChange: 31,
        description: "Total state exp.",
      },
      {
        title: "Total State Revenue",
        value: "$13,048,000",
        percentageChange: 12,
        description: "Revenue growth",
      },
      {
        title: "Total State Expenditure",
        value: "$500,756,000",
        percentageChange: 12,
        description: "Year to Date",
      },
    ]

    await delay(400)
    return HttpResponse.json(summaryData)
  }),

  // Handle GET requests to fetch users
  http.get("/api/users", async ({ request }) => {
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get("search")

    // Mock data
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com" },
    ]

    // Filter users if search query is provided
    const filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : users

    return HttpResponse.json({
      users: filteredUsers,
    })
  }),

  // Handle POST request to create a user
  http.post("/api/users", async ({ request }) => {
    const body = await request.json()
    const { name, email } = body as { name?: string; email?: string }

    // Validate input
    if (!name || !email) {
      return HttpResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Return a successful response
    return HttpResponse.json(
      {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),

  // Handle GET request for a specific user
  http.get("/api/users/:userId", ({ params }) => {
    const { userId } = params

    // Check if user exists
    if (userId === "404") {
      return HttpResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return the user data
    return HttpResponse.json({
      id: Number(userId),
      name: `User ${userId}`,
      email: `user${userId}@example.com`,
      role: "user",
    })
  }),

  // Handle PUT request to update a user
  http.put("/api/users/:userId", async ({ params, request }) => {
    const { userId } = params
    const body = await request.json()
    const { name, email } = body as { name?: string; email?: string }

    return HttpResponse.json({
      id: Number(userId),
      name,
      email,
      updatedAt: new Date().toISOString(),
    })
  }),

  // Handle DELETE request
  http.delete("/api/users/:userId", ({ params }) => {
    const { userId } = params

    return HttpResponse.json({
      success: true,
      message: `User ${userId} deleted successfully`,
    })
  }),
]

