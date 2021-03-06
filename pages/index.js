import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";

import CartLayout from "layout/CartLayout";
import ProductGrid from "@components/ProductGrid";
import sources from "sources";
import useModal from "hooks/useModal";
import ProductModal from "@components/ProductModal";
import CartButton from "@components/CartButton";
import { StoreContext } from "context/StoreProvider";
import useTranslation from "next-translate/useTranslation";
const ModalProduct = dynamic(() => import("@components/ModalProduct"));
const Page = dynamic(() => import("@components/Page"));

export default function Home({
	newProducts,
	saleProducts,
	brands,
	brandProducts,
}) {
	const { t } = useTranslation("common");
	const { state } = useContext(StoreContext);
	const { open, closeModal, openModal } = useModal({
		product: false,
	});
	const [modalData, setModalData] = useState(null);
	const [windowProps, setWindowProps] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		setWindowProps({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	return (
		<Page>
			{state.cartItems.length > 0 && <CartButton />}
			<ProductModal
				show={open.product}
				onClose={closeModal}
				title={modalData?.title}>
				{modalData && (
					<ModalProduct windowProps={windowProps} data={modalData?.data} />
				)}
			</ProductModal>
			<div className="grid grid-flow-col grid-cols-6 z-40 justify-center lg:pt-10">
				<div className="col-span-6 lg:col-span-4 flex flex-col justify-center px-1 sm:px-8 md:px-24 xl:px-32 gap-3 py-3 lg:max-h-screen lg:overflow-y-scroll">
					<div className="grid grid-cols-4 lg:grid-cols-6 bg-white w-full rounded-2xl p-5 md:p-10 py-5 lg:mt-96">
						{brands.map((brand, i) => (
							<div
								key={`${i}.-*?`}
								onClick={() => {
									const brandProduct = brandProducts.find(
										(p) => p.title === brand.brandName
									);
									setModalData({
										title: brandProduct.title,
										data: brandProduct.data,
									});
									openModal();
								}}
								className="p-2 lg:p-4 flex items-center justify-center m-0 cursor-pointer border-1">
								<Image
									src={`${sources.brand}${brand.guidName}`}
									width={140}
									height={140}
									objectFit="contain"
								/>
							</div>
						))}
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10">
						<ProductGrid
							onClick={() => {
								setModalData({
									title: t("new"),
									data: newProducts,
								});
								openModal();
							}}
							data={newProducts}
							title={t("new")}
							size={newProducts.length}
						/>
						<ProductGrid
							onClick={() => {
								setModalData({
									title: t("sale"),
									data: saleProducts,
								});
								openModal();
							}}
							data={saleProducts}
							title={t("sale")}
							size={saleProducts.length}
						/>
					</div>
				</div>

				<div className="col-span-2 hidden lg:block px-2">
					<CartLayout />
				</div>
			</div>
		</Page>
	);
}

export async function getStaticProps() {
	const { API_URL, SOURCE_PROOF } = process.env;
	const { get } = axios;
	const [{ data: newProducts }, { data: saleProducts }, { data: brands }] =
		await Promise.all([
			get(
				`${API_URL}/api/Product/GetNewProducts?lang=${"tr"}&sourceProof=${SOURCE_PROOF}`
			),
			get(
				`${API_URL}/api/Product/GetSaleProductsNew?lang=tr&pageNumber=1&pageSize=100&sourceProof=${SOURCE_PROOF}`
			),
			get(`${API_URL}/api/Brand/GetAllBrands?sourceProof=${SOURCE_PROOF}`),
		]);
	const brandProducts = [];

	await Promise.all(
		brands.map(async ({ brandName, brandID }) => {
			const { data: brandProduct } = await get(
				`https://api.solastore.com.tr/api/Product/GetSelectedBrandProducts?BrandID=${brandID}&lang=${"tr"}&sourceProof=${SOURCE_PROOF}`
			);

			brandProducts.push({
				data: brandProduct.reverse(),
				title: brandName,
			});
		})
	);

	return {
		props: {
			newProducts,
			saleProducts: saleProducts.item1.reverse(),
			brands,
			brandProducts,
		},
	};
}
