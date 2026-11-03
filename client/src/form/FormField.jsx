export function InputField(props){
    return(
        <>
        <label htmlFor={props.label} className={`text-${props.textColor}`}>{props.label}</label>
        <input
            type={props.type}
            id={props.label}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className="border rounded-xl px-4 py-1.5 w-full bg-white mt-2 mb-4"
        />
        </>
    )
}

export function SelectField(props){
    return(
        <div className="flex flex-row">
            <label htmlFor={props.label} className="text-white">{props.label}</label>
            <select name="" id={props.label}>
                {Object.values(props.optionValue).map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </div>
    )
}

export function SubmitFormButton(props){
    return(
        <button className={`p-2 rounded-xl bg-${props.buttonColor}-500 hover:bg-${props.buttonColor}-700 cursor-pointer text-center text-white w-full`}>{props.text}</button>
    )
}