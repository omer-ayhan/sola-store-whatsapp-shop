import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
	return (
		<div className="flex justify-around w-full h-10 bg-primary-green px-2">
			<div className="flex items-center">
				<button className="h-full px-4 col-span-1 border-x-1 border-x-[#2224261a] border-solid hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
					<FaSearch color="#fff" width={18} height={18} />
				</button>
				<Link href="/">
					<button className="px-4 text-sm text-white border-r-1 border-x-[#2224261a] border-solid h-full hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
						Sola Store
					</button>
				</Link>
			</div>
			<div className="flex">
				<button className="px-4 text-sm text-white border-x-1 border-x-[#2224261a] border-solid h-full hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
					EN
				</button>
				<button className="flex items-center justify-center px-4 text-sm text-white border-r-1 border-x-[#2224261a] border-solid h-full hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
					Cart{" "}
					<span className="px-2 mx-1 text-xs rounded-md bg-[#07a884]">6</span>
				</button>
			</div>
		</div>
	);
}
