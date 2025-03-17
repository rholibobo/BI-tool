"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { TextField, Button, Box, Paper, InputAdornment, IconButton, Alert, Snackbar } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useAuth } from "@/src/context/auth-context"

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
  const router = useRouter()
  const { register } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data.email, data.password, data.fullName)
      setSnackbarMessage("Registration successful")
      setSnackbarSeverity("success")
      setOpenSnackbar(true)

      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        router.push("/auth/login")
      }, 1500)
    } catch (error) {
      setSnackbarMessage("An error occurred during registration")
      setSnackbarSeverity("error")
      setOpenSnackbar(true)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              autoComplete="name"
              autoFocus
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create Account
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

