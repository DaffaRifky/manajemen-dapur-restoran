import { ImageCard, Section } from "../../../components/cards"
import { InputField, SubmitFormButton } from "../../../form/FormField";
import nasiGoreng from "../../../assets/nasiGoreng.png";
import Modal from "../../../components/modal";

export default function Menu(){
    return(
        <>
            <Section text="Makanan"/>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6 mb-8">
                <ImageCard image={nasiGoreng} name="Nasi Goreng"/>
                <ImageCard image={"https://1.bp.blogspot.com/-HbGVESk7vwc/Xv07i1dGLlI/AAAAAAAALBY/G18Iwjx7XtYOewALDRHjcL8hHLA4jBiqQCK4BGAsYHg/s1000/cara-membuat-mie-ayam.jpg"} name="Mie Ayam"/>
                <ImageCard image="add" name="" modalFor="card"/>
            </div>

            <Section text="Tambah Kategi Baru" isAddSection="true" modalFor="section"/>

            <Modal
            modalFor="card"
            title="Tambah Menu Baru"
            >
                <InputField label="Nama Menu" placeholder="Masukkan nama menu"/>
                <InputField label="Harga Menu" placeholder="Masukkan harga menu"/>
                <InputField label="Gambar Menu" placeholder="Pilih gambar menu" type="file"/>

                <SubmitFormButton text="Simpan" />
            </Modal>

            <Modal
            modalFor="section"
            title="Tambah Kategori Baru"
            >
                <InputField id="category-name" label="Nama Kategori" placeholder="Masukkan nama kategori"/>
                <SubmitFormButton text="Simpan" />
            </Modal>

        </>
    )
}