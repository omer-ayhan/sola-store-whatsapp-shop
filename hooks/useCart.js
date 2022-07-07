import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";

import { SET_CART_DATA } from "context/types";
import { StoreContext } from "context/StoreProvider";
import useQueryMutation from "./useQueryMutation";
import { notify } from "@components/Toast";
import useTranslation from "next-translate/useTranslation";

const fetchCart = async ({ userId }) => {
	const { data: cartData } = await axios.get(`/api/cart/getCartData`, {
		params: {
			userId,
		},
	});
	return cartData;
};

export default function useCart(dispatch, uid) {
	const { t } = useTranslation("common");
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
					notify(
						"success",
						t("notifications.addedToCart", {
							product: productName,
						})
					);
				},
			}
		);
	};

	const removeFromCart = (creds) => {
		const { userId, productId, productName } = creds;
		mutate(
			{
				url: `/api/cart/removeFromCart?VisitorID=${userId}&ProductID=${productId}`,
			},
			{
				onSuccess: () => {
					cartRefetch();
					notify(
						"success",
						t("notifications.removedCart", {
							product: productName,
						})
					);
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
					notify("success", t("notifications.increasedCart"));
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
					notify("error", t("notifications.decreasedCart"));
				},
				onError: () => {
					notify("error", t("notifications.error"));
				},
			}
		);
	};

	const emptyCart = (carts) => {
		try {
			carts.map((cart) =>
				mutate({
					url: `/api/cart/removeFromCart?VisitorID=${cart.memberID}&ProductID=${cart.productID}`,
				})
			);
			dispatch({
				type: SET_CART_DATA,
				payload: [],
			});
			notify("success", t("notifications.emptiedCart"));
		} catch (error) {
			notify("error", error);
		}
	};

	const cartActions = {
		addToCartAction,
		removeFromCart,
		incrementQuantity,
		decrementQuantity,
		cartRefetch,
		emptyCart,
	};

	return {
		cartActions,
		isCartLoading,
	};
}
