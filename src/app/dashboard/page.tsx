"use client"

import { useRouter } from "next/navigation"
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Box } from "@mui/material"
import { useAuth } from "@/src/context/auth-context"

export default function Dashboard() {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to your dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You are now logged in to your account. This page is protected and only accessible to authenticated users.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Account Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and manage your account details
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure your application preferences
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View your recent activity and logs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

