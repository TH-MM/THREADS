import { ErrorMessage, Field } from "formik";

const FieldBox = ({labelClassName,errorMessageClassName , className , type = 'text' ,name , placeholder , children}) => {
    return (
        <div className="mb-1 pb-6 relative w-full">
            <label htmlFor="" className={`block mb-2 text-sm font-medium text-gray-900 text-start ${labelClassName}`}>{children}</label>
            <Field type={type} name={name} placeholder={placeholder} className={`bg-gray-50 border text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`} />
            <ErrorMessage component="p" name={name} className={`text-red-500 text-xs text-start absolute bottom-1 pl-1 ${errorMessageClassName}`} />
        </div>
    )
}

export default FieldBox;