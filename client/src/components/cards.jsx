import { useState } from "react";
import { Image, Plus } from "lucide-react";

export function Section(props){
    return(
        <>
        {props.isAddSection === "true" ? (
            <button
            className="bg-white hover:bg-gray-300 w-full py-4 px-8 rounded-2xl shadow font-bold mb-6 flex flex-row"
            id={props.isAddSection}
            command="show-modal"
            commandfor={props.modalFor}
            >
                {props.text}
                <Plus className="ml-auto"/>
            </button>
        ) : (
            <div
            className="bg-white py-4 px-8 rounded-2xl shadow font-bold mb-6"
            id={props.isAddSection}>
                {props.text}
            </div>
        )}
        </>
    )
}

export function ImageCard(props){
    const [imageFailed, setImageFailed] = useState(false)

    return(
        <div className="bg-white rounded-2xl shadow w-full h-60">
            {props.image && !imageFailed ? ( //jika gambar error atau tidak ada
                <img
                src={props.image}
                alt={props.name}
                onError={() => setImageFailed(true)}
                className="rounded-t-2xl w-full h-40 object-cover"
                />
            ) : props.image?.toLowerCase() === 'add' ? ( // jika kartu digunakan untuk membuka modal
                <button
                className="bg-white hover:bg-gray-300 cursor-pointer rounded-2xl shadow w-full h-60 flex items-center justify-center"
                onClick={props.onClick}
                command="show-modal"
                commandfor={props.modalFor}
                >
                    <Plus className="w-30 h-30 text-gray-500"/>
                </button>
            ) : (
                <div className="w-full h-40 rounded-t-2xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <Image /> {/* kondisi default */}
                </div>
            )}
            <p className="text-2xl m-2">{props.name}</p>
        </div>
    )
}

export function Card(props) {
    return (
    <div className={`w-55 h-30 bg-white rounded-2xl shadow flex items-center justify-center`} >
        {props.children}
    </div>
    )
}