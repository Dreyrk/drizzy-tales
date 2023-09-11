export default function Message({ message }) {
    if (message.auto) {
        return (
            <div className="flex flex-col w-full mx-2">
                <span className="mb-2 text-lg font-semibold">{message.user.pseudo}</span>
                <p className="font-light">Has added <span className="text-lg font-medium">{message.text}</span> to watchlist</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col w-full mx-2">
                <span className="mb-2 text-lg font-semibold">{message.user.pseudo}</span>
                <p className="font-light">{message.text}</p>
            </div>
        )
    }
}