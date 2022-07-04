import axios from "axios";
import { saveCookie } from "lib/helpers";

export default async function createUserId(req, res) {
	try {
		const { data } = await axios.get(
			`https://api.solastore.com.tr/api/Logon/createUserGuidID?sourceProof=${process.env.SOURCE_PROOF}`
		);

		saveCookie({
			key: "user",
			value: data,
			req,
			res,
		});
		res.status(200).json(data);
	} catch (e) {
		res.status(e.response.status).json({
			message: e.response.data.message || "Something went wrong",
		});
	}
}
