import { X } from "lucide-react"

export default function Modal(props){
    return(
        <>
            <dialog
            id={props.modalFor}
            className="fixed left-1/2 top-1/2 m-0 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-8 border rounded-2xl"
            >
                <div id="header" className="flex flex-row">
                    <p className="text-2xl">{props.title}</p>
                    <button 
                    className="ml-auto cursor-pointer" 
                    commandfor={props.modalFor}
                    command="close"
                    >
                        <X />
                    </button>
                </div>
                <hr className="my-4"/>

                {props.children}

            </dialog>
        </>
    )
}