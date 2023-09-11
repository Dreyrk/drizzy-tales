import Message from "./Message";

export default function MessageDisplay({ data }) {
    return (
        <div className="h-[74vh] flex flex-col gap-6 p-2 mt-2 overflow-auto no-scrollbar">
            {data.map((message) => (<Message key={message._id} message={message} />))}
        </div>
    )
}