import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuMenu } from "react-icons/lu";
import styles from "../Nav.module.css";
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";
import { getLogoItem, formatNavSubItemUrl } from "@/utils/navigation";

const SideNav = ({ navItems, logo }) => {
  const logoItem = getLogoItem(navItems);
  const menuItems = navItems.filter((item) => item.item !== "Logo");

  return (
    <Sheet id="sheet">
      <SheetTrigger className="z-5 bg-transparent cursor-pointer hover:bg-transparent lg:hidden">
        <LuMenu className="w-6 h-6" />
        <span className="sr-only">Toggle navigation menu</span>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <Link className="relative flex h-20 w-52" href={logoItem.slug}>
          {SafeImage(
            logo.data,
            "object-contain bg-white",
            "calc(12.24vw + 71px)",
            "eager"
          )}
          <span className="sr-only">{logo.data.attributes.name}</span>
        </Link>
        <div className="grid gap-6 py-6">
          {menuItems.map((item) => renderNavItem(item))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderNavItem = (item) => {
  if (item.children) {
    return (
      <Accordion key={item.id} type="single" collapsible className="w-full">
        <AccordionItem value={`item-${item.id}`}>
          <AccordionTrigger className="flex items-center w-full py-2 text-lg font-black bg-transparent font-fancy hover:bg-gray-200">
            {item.item}
          </AccordionTrigger>
          {item.children.map((child) => (
            <AccordionContent
              key={child.id}
              className={`${styles.sheetLink} font-fancy flex items-center py-2 text-lg font-black`}
            >
              <SheetClose asChild>
                <Link
                  href={formatNavSubItemUrl(item, child)}
                  className="w-full"
                >
                  {child.item}
                </Link>
              </SheetClose>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    );
  }
  return (
    <SheetClose key={item.id} asChild>
      <Link
        className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-black font-fancy`}
        href={item.slug}
      >
        {item.item}
      </Link>
    </SheetClose>
  );
};

export default SideNav;
