import axios from "axios";
import requestIp from "request-ip";

export default async function addToCart(req, res) {
	const { user, productID, quantity } = req.query;
	const clientIp = requestIp.getClientIp(req);
	try {
		const { data } = await axios.post(
			`https://api.solastore.com.tr/api/Order/AddToChart?UserID=${user}&IP=${clientIp}&ProductID=${productID}&Quantity=${quantity}&Os=Desktop&sourceProof=${process.env.SOURCE_PROOF}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					productID,
					quantity: quantity,
					originId: productID,
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
