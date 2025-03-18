"use client"

import type React from "react"

import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a2233", // Match the drawer color
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a2233", // Darker blue that matches the image
          color: "#ffffff",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#4fc3f7", // Light blue background
            "&:hover": {
              backgroundColor: "#4fc3f7", // Keep the same color on hover
            },
            "& .MuiListItemIcon-root": {
              color: "#ffffff", // White icon for selected item
            },
            "& .MuiListItemText-primary": {
              fontWeight: "bold", // Bold text for selected item
              color: "#ffffff", // White text for selected item
            },
          },
          "&:hover": {
            backgroundColor: "rgba(79, 195, 247, 0.2)", // Light blue with opacity for hover
          },
        },
      },
    },
  },
})

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

