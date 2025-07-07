import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "lucide-react"
import Link from "next/link"
import Image from "next/image";

async function Header() {
    const session = await getServerSession(authOptions);
    return (
        <header className="shadow bg-gray-900 text-white p-5 md:px-20">
            <div className="container flex items-center justify-between mx-auto text-xl" style={{ fontFamily: 'var(--font-montserrat )' }}>
                <Link href='/' className="font-medium ml-5 hover:text-gray-300" >Movie Reviews</Link>
                <nav className="space-x-4" style={{ fontFamily: 'var(--font-space--grotesk)' }}>
                    <Link href="/" className="relative group">
                        <span className="group-hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300">Home</span>
                    </Link>
                    <Link href="/about" className="relative group">
                        <span className="group-hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300">About</span>
                    </Link>
                    <Link href="/movies" className="relative group">
                        <span className="group-hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300">Movies</span>
                    </Link>
                    <Link href="/login" className="relative group hover:text-gray-300">
                        {session?.user?.image ? (
                            <Image src={session.user.image}
                                alt="Profile"
                                width={35}
                                height={35}
                                className="rounded-full inline-block"
                            />
                        ) : (
                            <User className="w-8 h-8 inline-block bg-amber-400 rounded-full" />
                        )}
                        <span className="absolute left-1/2 transform -translate-x-1/2 mt-8 text-sm text-white bg-black px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Profile
                        </span>
                    </Link>
                </nav>
            </div>
        </header >
    )
}
export default Header
