
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        neon: {
          green: "#00FF41",
          blue: "#1EAEDB",
          yellow: "#FFDD00"
        },
        matrix: {
          dark: "#0A0A0A",
          darker: "#050505",
          gray: "#333333",
          lightgray: "#555555",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "glow-pulse": {
          "0%, 100%": { 
            filter: "drop-shadow(0 0 5px hsl(var(--primary)))" 
          },
          "50%": { 
            filter: "drop-shadow(0 0 15px hsl(var(--primary)))" 
          }
        },
        "float": {
          "0%, 100%": { 
            transform: "translateY(0)" 
          },
          "50%": { 
            transform: "translateY(-10px)" 
          }
        },
        "slide-up": {
          "0%": { 
            transform: "translateY(50px)",
            opacity: "0" 
          },
          "100%": { 
            transform: "translateY(0)",
            opacity: "1" 
          }
        },
        "slide-right": {
          "0%": { 
            transform: "translateX(-50px)",
            opacity: "0" 
          },
          "100%": { 
            transform: "translateX(0)",
            opacity: "1" 
          }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "count-up": {
          "0%": { content: "0%" },
          "20%": { content: "20%" },
          "40%": { content: "40%" },
          "60%": { content: "60%" },
          "80%": { content: "80%" },
          "100%": { content: "100%" }
        },
        "neon-border": {
          "0%, 100%": { 
            border: "1px solid rgba(0, 255, 65, 0.3)" 
          },
          "50%": { 
            border: "1px solid rgba(0, 255, 65, 0.8)" 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "slide-right": "slide-right 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "neon-border": "neon-border 2s ease-in-out infinite"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-grid": "linear-gradient(rgba(30, 30, 30, 0.2) 1px, transparent 1px), linear-gradient(to right, rgba(30, 30, 30, 0.2) 1px, transparent 1px)",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "2xs": "0.6rem"
      },
      boxShadow: {
        "neon-green": "0 0 5px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.3)",
        "neon-blue": "0 0 5px rgba(30, 174, 219, 0.5), 0 0 20px rgba(30, 174, 219, 0.3)",
        "card-hover": "0 10px 20px rgba(0, 0, 0, 0.3)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
