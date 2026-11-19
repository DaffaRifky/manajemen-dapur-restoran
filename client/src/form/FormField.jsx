

export function InputField(props){
    return(
        <>
        <label htmlFor={props.label} className={`text-${props.textColor}  text-sm `}>{props.label}</label>
        <input
            type={props.type}
            id={props.label}
            placeholder={props.placeholder}
            required={props.required}
            minLength={props.minLength}
            value={props.value}
            onChange={props.onChange}
            className={`border border-${props.textColor} rounded-lg px-4 py-2 w-full bg-white mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all`}
        />
        <label htmlFor={props.label} className="text-red-700 text-xs mb-3">{props.error}</label>
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
        <button className={`p-2 rounded-xl mt-4 bg-blue-500 hover:bg-blue-400 cursor-pointer text-center text-white w-full`}>{props.text}</button>
    )
}