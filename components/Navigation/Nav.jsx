import SideNav from "./parts/SideNav";
import MainNav from "./parts/MainNav";

const Nav = ({ navMenuItems, logo }) => {
	return (
		<>
			<SideNav navItems={navMenuItems.menuItems} logo={logo} />
			<MainNav navItems={navMenuItems.menuItems} logo={logo} />
		</>
	);
};

export default Nav;
