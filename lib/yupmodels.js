import * as Yup from "yup";

export const paymentModel = {
	initials: {
		name: "",
		tel: "",
	},
	schema: Yup.object().shape({
		name: Yup.string().required("Name is required"),
		tel: Yup.string().required("Tel is required"),
	}),
};
