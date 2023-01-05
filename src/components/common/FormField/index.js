
export const RenderInput = ({
    labelName,
    type = "text",
    name,
    containerClass,
    inputClass,
    errorClass,
}) => {
    return (
        <div className={containerClass}>
            <label>{labelName}</label>
            <input type={type} className={inputClass} name={name} />
            <span className={errorClass}>*error</span>
        </div>
    )
}
