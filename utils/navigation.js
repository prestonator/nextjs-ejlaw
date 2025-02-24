export const getLogoItem = (navItems) =>
  navItems.find((item) => item.item === "Logo");

export const formatNavSubItemUrl = (parentItem, subItem) =>
  parentItem.item === "Our Team" ? `/our-team${subItem.slug}` : subItem.slug;
