import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";

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

export default function useCart(dispatch, uid) {
	const { isLoading: isCartLoading, refetch: cartRefetch } = useQuery(
		`cartData-${uid}`,
		() =>
			fetchCart({
				userId: uid,
			}),
		{
			onSuccess: async (data) => {
				dispatch({
					type: SET_CART_DATA,
					payload: data,
				});
			},
		}
	);

	const { mutate } = useQueryMutation("add_to_cart");

	const addToCartAction = (creds) => {
		const { userId, productId, productName, quantity } = creds;
		mutate(
			{
				url: `/api/cart/addToCart?user=${userId}&productID=${productId}&quantity=${quantity}`,
			},
			{
				onSuccess: () => {
					cartRefetch();
					notify("success", `${productName} added to cart`);
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
		console.log("increase!!!", creds);
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
