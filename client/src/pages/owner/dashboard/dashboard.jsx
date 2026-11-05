import { Card } from "../../../components/cards"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Dashboard(){
    return(
        <div className="grid gap-5 grid-cols-5">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <div className="bg-white shadow rounded-2xl w-full h-80 col-span-2 flex items-center justify-center ">
                <div className="bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded-full shadow-md mr-auto -ml-5 flex items-center justify-center"><ChevronLeft /></div>
                <div className="bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded-full shadow-md ml-auto -mr-5 flex items-center justify-center"><ChevronRight /></div>
            </div>
            <div className="bg-white shadow rounded-2xl w-full h-80 col-span-3">
            </div>
        </div>
    )
}