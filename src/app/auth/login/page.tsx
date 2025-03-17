import type { Metadata } from "next"
import { Container, Typography, Box, Link as MuiLink } from "@mui/material"
import Link from "next/link"
import LoginForm from "@/src/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography component="h1" variant="h4" fontWeight="bold">
          Sign in to your account
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Or{" "}
            <Link href="/auth/register" passHref>
              <MuiLink underline="hover">create a new account</MuiLink>
            </Link>
          </Typography>
        </Box>
      </Box>
      <LoginForm />
    </Container>
  )
}

