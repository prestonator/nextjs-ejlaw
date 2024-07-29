const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		screens: {
			xs: "475px",
			sm: "576px",
			md: "960px",
			lg: "1440px",
			"2xl": "1536px",
			"3xl": "1800px",
			"4xl": "2560px",
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1536px",
			},
		},
		extend: {
			fontFamily: {
				fancy: ["var(--font-fancy)"],
				body: ["var(--font-body)"],
				special: ["var(--font-special)"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				backgroundGradient: {
					"0%": {
						backgroundPosition: "0% 0%",
					},
					"100%": {
						backgroundPosition: "35% 50%",
					},
				},
				textColor: {
					"0%": {
						color: "#000",
					},
					"100%": {
						color: "#fff",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"background-gradient": "backgroundGradient 2s ease forwards",
				"text-white-black": "textColor 2s ease forwards",
				"text-black-white": "textColor 2s ease reverse forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
