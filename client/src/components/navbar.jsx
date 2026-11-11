
export default function navbar(props) {
    return(
        <div className="ml-64 h-15 bg-white shadow border-b-2 border-gray-200 flex items-center justify-between px-8">
            {props.children}
        </div>
    )
}