import Link from "next/link";
import { Create } from "@/components/Icons/Create";
import { Home } from "@/components/Icons/Home";
import { Search } from "@/components/Icons/Search";

export const TopNavbar = () => (
  <nav className="bg-white border-t border-gray-200 flex h-12 w-full">
    <Link
      href="/home"
      className="flex items-center justify-center flex-1 h-full hover:bg-gradient-radial hover:from-blue-100 hover:via-transparent hover:to-transparent"
    >
      <Home width={32} height={32} stroke="#09f" />
    </Link>
    <Link
      href="/search"
      className="flex items-center justify-center flex-1 h-full hover:bg-gradient-radial hover:from-blue-100 hover:via-transparent hover:to-transparent"
    >
      <Search width={32} height={32} stroke="#09f" />
    </Link>
    <Link
      href="/compose/tweet"
      className="flex items-center justify-center flex-1 h-full hover:bg-gradient-radial hover:from-blue-100 hover:via-transparent hover:to-transparent"
    >
      <Create width={32} height={32} stroke="#09f" />
    </Link>
  </nav>
);
