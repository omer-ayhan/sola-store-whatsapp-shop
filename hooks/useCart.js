import axios from "axios";
import { useContext } from "react";
import { useQueryClient } from "react-query";

import { SET_CART_DATA } from "context/types";
import { StoreContext } from "context/StoreProvider";
import useQueryMutation from "./useQueryMutation";
import { notify } from "@components/Toast";

const fetchCart = async ({ userId }) => {
	const { data: cartData } = await axios.get(`/api/cart/getCartData`, {
		params: {
			userId,
		},
	});
	return cartData;
};

export default function useCart(dispatch) {
	const { state } = useContext(StoreContext);
	const { isLoading: isCartLoading, refetchQueries: cartRefetch } =
		useQueryClient(
			`cart_api`,
			() =>
				fetchCart({
					userId: state.uid,
				}),
			{
				onSuccess: async ({ data }) => {
					dispatch({
						type: SET_CART_DATA,
						payload: data,
					});
				},
			}
		);

	const { mutate } = useQueryMutation("add_to_cart_action");

	const addToCartAction = (creds) => {
		const { userId, productId, quantity } = creds;
		mutate(
			{
				url: `/api/cart/addToCart?user=${userId}&productID=${productId}&quantity=${quantity}`,
			},
			{
				onSuccess: () => {
					cartRefetch();
					notify("success", "Product added to cart");
				},
			}
		);
	};

	const removeFromCart = (creds) => {
		const { userId, productId } = creds;
		mutate(
			{
				url: `/api/cart/removeFromCart?user=${userId}&ProductID=${productId}`,
			},
			{
				onSuccess: () => {
					cartRefetch();
					notify("success", "Product added to cart");
				},
			}
		);
	};

	const incrementQuantity = (creds) => {
		const { userId, productId } = creds;
		mutate(
			{
				url: `/api/cart/increaseProductCount?user=${userId}&ProductID=${productId}`,
			},
			{
				onSuccess: () => {
					cartRefetch();
					notify("success", "Increased Quantity");
				},
			}
		);
	};

	const decrementQuantity = (creds) => {
		const { userId, productId } = creds;
		mutate(
			{
				url: `/api/cart/decreaseProductCount?user=${userId}&ProductID=${productId}`,
			},
			{
				onSuccess: ({ data }) => {
					cartRefetch();
					notify("error", "Decreased Quantity");
				},
			}
		);
	};

	const cartActions = {
		addToCartAction,
		removeFromCart,
		incrementQuantity,
		decrementQuantity,
		cartRefetch,
	};

	return {
		cartActions,
		isCartLoading,
	};
}
