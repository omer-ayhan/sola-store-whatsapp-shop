import { notify } from "@components/Toast";
import { useEffect } from "react";

export const Input = ({
	label,
	handleChange,
	handleBlur,
	values,
	errors,
	placeholder,
	id,
	type = "text",
	name,
	labelClassName,
	formClassName,
	containerClass,
	touched,
	required,
	...rest
}) => {
	return (
		<div className={containerClass}>
			{label && (
				<label htmlFor={id} className={labelClassName}>
					{label} {required && <span className="text-red-500">*</span>}
				</label>
			)}
			<input
				id={id}
				type={type ? type : "text"}
				name={name}
				onChange={handleChange}
				onBlur={handleBlur}
				value={values}
				placeholder={placeholder}
				className={`appearance-none relative block w-full px-3 py-3 ring-1 ring-gray-400 ring-opacity-50 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none ${
					errors && touched
						? "border border-3 rounded-3 border-red-600 ring-transparent"
						: ""
				} ${formClassName}`}
				required={required}
				{...rest}
			/>
			<div className="text-red-500" style={{ display: "block" }}>
				{errors && errors}
			</div>
		</div>
	);
};
