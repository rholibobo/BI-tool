import type { Metadata } from "next"

import { Container, Typography, Box, Link as MuiLink } from "@mui/material"
import Link from "next/link"
import RegisterForm from "@/src/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
}

export default function RegisterPage() {
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
          Create a new account
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Or{" "}
            <Link href="/auth/login" passHref>
              <MuiLink underline="hover">sign in to your existing account</MuiLink>
            </Link>
          </Typography>
        </Box>
      </Box>
      <RegisterForm />
    </Container>
  )
}

