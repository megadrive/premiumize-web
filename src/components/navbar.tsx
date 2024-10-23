import Link from "next/link";
import { FaFolder, FaCloudArrowUp } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

function NavbarItem({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`h-8 w-8 border-t-2 p-1 hover:border-slate-200 ${active ? "border-slate-200" : "border-transparent"}`}
    >
      {children}
    </div>
  );
}

const ICON_SIZE = 32;
export default function Navbar() {
  return (
    <div className="flex w-full items-center justify-between border-t border-slate-900 bg-slate-800">
      <Link href="/app">
        <NavbarItem>
          <FaFolder color="white" width={ICON_SIZE} height={ICON_SIZE} />
        </NavbarItem>
      </Link>
      <Link href="/transfers">
        <NavbarItem>
          <FaCloudArrowUp color="white" width={ICON_SIZE} height={ICON_SIZE} />
        </NavbarItem>
      </Link>
      <Link href="/signout">
        <NavbarItem>
          <FaSignOutAlt color="white" width={ICON_SIZE} height={ICON_SIZE} />
        </NavbarItem>
      </Link>
    </div>
  );
}
