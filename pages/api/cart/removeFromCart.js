import axios from "axios";

export default async function removeFromCart(req, res) {
	const { VisitorID, ProductID } = req.query;
	try {
		const { data } = await axios.post(
			`https://api.solastore.com.tr/api/Order/RemoveFromChart?UserID=${VisitorID}&ProductID=${ProductID}&sourceProof=${process.env.SOURCE_PROOF}`,
			{
				body: {
					VisitorID,
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
