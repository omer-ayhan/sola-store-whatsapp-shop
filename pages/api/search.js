import axios from "axios";

export default async function searchData(req, res) {
	const { text, lang } = req.body;
	const { SOURCE_PROOF, API_URL } = process.env;

	try {
		const { data } = await axios.get(
			`${API_URL}/api/Helpers/AdvancedSearchTextSearch`,
			{
				params: {
					text,
					lang,
					sourceProof: SOURCE_PROOF,
				},
			}
		);

		res.status(200).json(data);
	} catch (err) {
		res
			.status(err.response.status)
			.json(err.response.data || "Something went wrong");
	}
}
