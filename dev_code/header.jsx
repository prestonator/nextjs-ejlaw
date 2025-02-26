"use client";

import { useState, useEffect } from "react";
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/utils";

export function Header({ navMenu, logo }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to filter out 'Logo' menu item if needed.
  const menuItems =
    navMenu?.menuItems.filter((item) => item.item !== "Logo") || [];

  // Split into left/right groups (4 items each)
  const leftItems = menuItems.slice(0, 4);
  const rightItems = menuItems.slice(4);
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300",
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="py-2 text-center text-sm">
            <a
              href="https://elton-jenkins-attorney-at-law.mycase.com/paypage/DNMiVDCbKLCJvWyCSiPEe3FA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Notice: Visit our payment page to settle your invoices online.
            </a>
          </div>
        </div>
      </div>
      <nav className="mx-auto px-4">
        <div className="flex items-center py-4">
          <div className="block md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-evenly md:gap-2.5">
            {leftItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setOpenSubmenu(item.item)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  href={item.slug}
                  className="group inline-flex items-center font-fancy text-(length:--size-1-5)"
                >
                  {item.item}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && openSubmenu === item.item && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border bg-white py-2 shadow-lg transition-opacity duration-200 ease-in-out">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.slug}
                        className="block px-4 py-2 font-fancy hover:bg-gray-50"
                      >
                        {subItem.item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex-shrink-0 md:mx-[2.5vw]">
            <Link href="/" className="relative flex h-16 w-[15vw]">
              {SafeImage(
                logo.data,
                "object-contain",
                "calc(12.24vw + 71px)",
                "eager"
              )}
            </Link>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-evenly md:gap-2.5">
            {rightItems.map((item) => (
              <Link
                key={item.id}
                href={item.slug}
                className="font-fancy text-(length:--size-1-5)"
              >
                {item.item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="relative h-16 w-32">
            {SafeImage(
              logo.data,
              "object-contain bg-white",
              "calc(12.24vw + 71px)",
              "eager"
            )}
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
            <span className="sr-only">Close main menu</span>
          </button>
        </div>
        <div className="mt-6">
          {menuItems.map((item) => (
            <div key={item.id} className="py-2">
              {item.children ? (
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between font-fancy text-lg">
                    {item.item}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="ml-4 mt-2 space-y-2">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.slug}
                        className="block font-fancy text-base"
                        onClick={toggleMobileMenu}
                      >
                        {subItem.item}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item.slug}
                  className="block font-fancy text-lg"
                  onClick={toggleMobileMenu}
                >
                  {item.item}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-25 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
}
