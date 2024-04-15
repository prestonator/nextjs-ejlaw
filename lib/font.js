import { Cormorant, Montserrat, Saira } from "next/font/google";

export const cormorant_init = Cormorant({
	subsets: ["latin"],
	variable: "--font-fancy",
	display: "swap",
});

export const montserrat_init = Montserrat({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

export const saira_init = Saira({
	subsets: ["latin"],
	variable: "--font-special",
	axes: ["wdth"],
	display: "swap",
});

export const cormorant = cormorant_init.variable;
export const montserrat = montserrat_init.variable;
export const saira = saira_init.variable;