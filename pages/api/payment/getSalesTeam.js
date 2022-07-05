import axios from "axios";
import sources from "sources";

export default async function getSalesTeam(req, res) {
	const { API_URL, SOURCE_PROOF } = process.env;
	try {
		const { data } = await axios.get(
			`${API_URL}/api/User/GetSalesReps?sourceProof=${SOURCE_PROOF}`
		);
		res.status(200).json([
			...data,
			{
				id: sources.DEF_SELLER,
				name: "Tatyana",
				surname: "tatyana",
				pictureGuidName: "/images/representer.jpg",
			},
		]);
	} catch (err) {
		res.status(err.response.status).json(err.response.data.message);
	}
}
