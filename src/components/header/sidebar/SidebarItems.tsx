interface SidebarItemProps {
  text: string;
  children: JSX.Element;
  href: string;
}
export function SidebarItem({
  text,
  children,
  href,
}: SidebarItemProps) {
  return (
    <>
      <div className="flex items-center hover:bg-hoverMobile">
        {children}
        <a
          href={href}
          className="py-2 px-3 font-semibold"
        >
          {text}
        </a>
      </div>
    </>
  );
}
