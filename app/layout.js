import "./globals.css";
import { fetchData } from "@/lib/fetchData";
import { RootLayoutQuery } from "@/queries/rootLayout.graphql";
import Navbar from "@/components/NavBar/NavBar";
import { cormorant, montserrat, saira } from "@/lib/font";

const getData = async () => {
	const { data } = await fetchData(RootLayoutQuery.loc.source.body);
	return data?.rootLayout?.data?.attributes || [];
};

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
	const { navMenu, logo } = await getData();
	return (
		<html
			lang="en"
			className={`${cormorant.variable} ${montserrat.variable} ${saira.variable}`}
		>
			<body>
				<Navbar navItems={navMenu} logo={logo} />
				{children}
			</body>
		</html>
	);
}
