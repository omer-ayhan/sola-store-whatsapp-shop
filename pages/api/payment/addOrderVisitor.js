import axios from "axios";

export default async function addOrderVisitor(req, res) {
	const { API_URL, SOURCE_PROOF } = process.env;
	try {
		const { data } = await axios.post(
			`${API_URL}/api/Order/AddOrderVisitorNew?sourceProof=${SOURCE_PROOF}`,
			req.body
		);
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res
			.status(err.response.status)
			.json(err.response.data.message || "Something went wrong");
	}
}
