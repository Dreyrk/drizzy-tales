import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

export default async function Page() {
    return (
        <div className="page">
            <Chat />
            <NavBar />
        </div>
    )
}