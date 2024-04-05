import { Montserrat, Saira } from "next/font/google";

export const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

export const saira = Saira({
	subsets: ["latin"],
	variable: "--font-special",
	axes: ["wdth"],
	display: "swap",
});
