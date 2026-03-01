"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Simulator", path: "/simulator" },
  { name: "Audit Log", path: "/audit" },
  { name: "Queue", path: "/queue" },
  { name: "Rules", path: "/rules" },
  { name: "Metrics", path: "/metrics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <div className="logo">NPE.io</div>

      {menu.map((item) => (
        <Link key={item.path} href={item.path}>
          <div className={pathname === item.path ? "nav active" : "nav"}>
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}