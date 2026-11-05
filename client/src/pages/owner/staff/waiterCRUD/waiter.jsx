import Modal from "../../../../components/modal"
import Table from "../../../../components/table"
import StaffCRUD from "../../../../form/staffCRUD"

export default function Waiter(){
    return(
        <div className="flex flex-col min-h-screen items-center justify-center">
            <button className="bg-blue-500 text-white p-2 rounded-lg" id="add-Staff" command="show-modal" commandfor="add-staff">
                Tambah Staff
            </button>
            <Modal modalFor="add-staff" title="Tambah Staff Baru">
                <StaffCRUD />
            </Modal>
            <Table />
        </div>
    )
}