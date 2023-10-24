import Loader from "@/app/components/Loader";
import Link from "next/link";

export default function Page() {
    return (
        <div className="grid h-screen place-content-center">
            <div className="flex flex-col gap-10">
                <h1 className="my-8 text-3xl" >Work in progress...</h1>
                <Loader size={100} />
            </div>
            <Link className="text-lg underline" href={"/"} replace={true}>Go Home</Link>
        </div>
    )
}