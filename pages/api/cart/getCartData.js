import axios from "axios";

export default async function getCartData(req, res) {
	const { userId } = req.query;
	try {
		const { data } = await axios.get(
			`https://api.solastore.com.tr/api/Order/ChartList?UserID=${userId}&sourceProof=${process.env.SOURCE_PROOF}`
		);
		res.status(200).json(data);
	} catch (e) {
		res.status(e.response.status).json({
			message: e.response.data.message || "Something went wrong",
		});
	}
}
