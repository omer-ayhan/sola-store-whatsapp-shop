import axios from "axios";
import { useMutation } from "react-query";

const useQueryMutation = (cartName) => {
	return useMutation(cartName, async ({ url }) => {
		return await axios.post(url);
	});
};

export default useQueryMutation;
