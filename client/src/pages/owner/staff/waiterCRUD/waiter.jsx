import Modal from "../../../../components/modal"
import Table from "../../../../components/table"
import StaffCRUD from "../../../../form/staffCRUD"

export default function Waiter(){
    return(
        <div className="flex flex-col min-h-screen items-center justify-center">
            <StaffCRUD />
            <Table />
        </div>
    )
}