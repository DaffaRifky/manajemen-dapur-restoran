import { Role } from "../../../server/generated/prisma/enums"
import { InputField, SubmitFormButton } from "./FormField"
import Modal from "../components/modal"


export default function StaffCRUD(){
    return(
        <form>
            <p className="text-2xl">Tambah Waiter</p>
            <InputField textColor="black" type="text" label="Name"  />
            <InputField textColor="black" type="email" label="Email"  />
            <InputField textColor="black" type="password" label="Password"  />

            <SubmitFormButton text="Simpan" />
        </form>
    )
}