import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "../Nav.module.css";
import { getLogoItem, formatNavSubItemUrl } from "@/utils/navigation";

const MainNav = ({ navItems, logo }) => {
  const logoItem = getLogoItem(navItems);
  // Remove the logo item from the list for the menu
  const menuItems = navItems.filter((item) => item.item !== "Logo");

  // Split into left/right groups (4 items each)
  const leftItems = menuItems.slice(0, 4);
  const rightItems = menuItems.slice(4);

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="gap-[1.5vw]">
        {leftItems.map((item) => renderNavItem(item))}
        {/* Centered logo */}
        <Link
          href={logoItem.slug}
          className="relative flex h-[var(--size-10)] w-[var(--size-35)]"
        >
          {SafeImage(
            logo.data,
            "object-contain",
            "calc(12.24vw + 71px)",
            "eager"
          )}
        </Link>
        {rightItems.map((item) => renderNavItem(item))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const renderNavItem = (item) => {
  if (item.children) {
    return (
      <NavigationMenuItem key={item.id} className={styles.listItem}>
        <NavigationMenuTrigger
          className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group w-max text-md`}
        >
          {item.item}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className={styles.subMenu}>
            {item.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={formatNavSubItemUrl(item, child)}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink>{child.item}</NavigationMenuLink>
                </Link>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.id} className={styles.listItem}>
      <Link href={item.slug} legacyBehavior passHref>
        <NavigationMenuLink
          className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group h-9 w-max text-md`}
        >
          {item.item}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default MainNav;
