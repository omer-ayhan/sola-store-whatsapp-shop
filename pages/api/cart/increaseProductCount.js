import axios from "axios";

export default async function increaseProductCount(req, res) {
	const { user, ProductID } = req.query;

	try {
		const { data } = await axios.post(
			`https://api.solastore.com.tr/api/Order/IncreaseProductCountInChart?UserID=${user}&ProductID=${ProductID}&sourceProof=${process.env.SOURCE_PROOF}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					UserID: user,
					ProductID,
				},
			}
		);
		res.status(200).json(data);
	} catch (e) {
		res.status(e.response.status).json({
			message: e.response.data.message || "Something went wrong",
		});
	}
}
