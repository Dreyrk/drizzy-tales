import Link from "next/link"

export default function ProfileLink({ href, logo, text }) {
    return (
        <Link href={href} className="flex items-center gap-2 p-8 font-bold text-white w-fit hover:text-purple-400 text-start">
            {logo}
            <span>{text}</span>
        </Link>
    )
}