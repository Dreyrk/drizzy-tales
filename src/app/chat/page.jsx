import Chat from "../components/Chat";
import Loader from "../components/Loader";
import getMessages from "../serverActions/getMessages";

export default async function Page() {
    const messages = await getMessages();

    return (
        <div className="max-h-screen no-scrollbar">
            {messages ? <Chat data={messages} /> : <Loader />}
        </div>
    )
}