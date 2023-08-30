const isActive = (pathname, link) => {
  if (pathname === "/" && link.name !== "Home") {
    return false;
  }
  return pathname === link.href || pathname.includes(link.name.toLowerCase());
};

export default isActive;
