import { Card, Section } from "../../../components/cardsAndSection"
import { InputField, SubmitFormButton } from "../../../form/FormField";
import nasiGoreng from "../../../assets/nasiGoreng.png";
import Modal from "../../../components/modal";

export default function Menu(){
    return(
        <>
            <Section text="Makanan"/>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6 mb-8">
                <Card image={nasiGoreng} name="Nasi Goreng"/>
                <Card image={nasiGoreng} name="Nasi Goreng"/>
                <Card image={nasiGoreng} name="Nasi Goreng"/>
                <Card image={nasiGoreng} name="Nasi Goreng"/>
                <Card image={nasiGoreng} name="Nasi Goreng"/>
                <Card image="add" name="" modalFor="card"/>
            </div>

            <Section text="Tambah Kategi Baru" isAddSection="true" modalFor="section"/>

            <Modal
            modalFor="card"
            title="Tambah Menu Baru"
            >
                <InputField />
            </Modal>

            <Modal
            modalFor="section"
            title="Tambah Kategori Baru"
            >
                <InputField />
                <SubmitFormButton buttonColor="blue" text="Simpan" />
            </Modal>

        </>
    )
}