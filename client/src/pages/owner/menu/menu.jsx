import { ImageCard, Section } from "../../../components/cards"
import { InputField, SubmitFormButton } from "../../../form/FormField";
import Modal from "../../../components/modal";
import { MenuItems, MenuChategory } from "../../../data/menu";

export default function Menu(){
    return(
        <>
            {/* map menu chategories and the menu items with corresponding chategory */}
            {MenuChategory.map((menuChat) => (
                <>

                <Section text={menuChat}/>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6 mb-8">
                    {MenuItems.filter((item) => item.chategory === menuChat).map(({ image, name}) => (
                        <ImageCard image={image} name={name}/>
                    ))}

                    {/* add new menu item card */}
                    <ImageCard image="add" name="" modalFor="card"/>
                </div>

                </>
            ))}

            {/* add new menu chategory section */}
            <Section text="Tambah Kategi Baru" isAddSection="true" modalFor="section"/>

            {/* add menu item modal form */}
            <Modal
            modalFor="card"
            title="Tambah Menu Baru"
            >
                <InputField label="Nama Menu" placeholder="Masukkan nama menu"/>
                <InputField label="Harga Menu" placeholder="Masukkan harga menu"/>
                <InputField label="Gambar Menu" placeholder="Pilih gambar menu" type="file"/>

                <SubmitFormButton text="Simpan" />
            </Modal>

            {/* add menu chategory modal form */}
            <Modal
            modalFor="section"
            title="Tambah Kategori Baru"
            >
                <form action="">
                    <InputField id="category-name" label="Nama Kategori" placeholder="Masukkan nama kategori"/>

                    <SubmitFormButton text="Simpan" />
                </form>

            </Modal>

        </>
    )
}