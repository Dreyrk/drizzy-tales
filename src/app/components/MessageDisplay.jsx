import Message from "./Message";

export default function MessageDisplay({ data }) {
    return (
        <div className="h-[70vh] overflow-auto no-scrollbar p-2 mt-2 flex flex-col gap-6">
            {data.map((message) => (<Message key={message._id} message={message} />))}
        </div>
    )
}