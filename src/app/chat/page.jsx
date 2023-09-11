import Chat from "../components/Chat";
import getMessages from "../serverActions/getMessages";

export default async function Page() {
    const messages = await getMessages();

    return (
        <div className="max-h-screen no-scrollbar">
            <Chat data={messages} />
        </div>
    )
}