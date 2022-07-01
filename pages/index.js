import axios from "axios";
import Image from "next/image";

import CartLayout from "@components/CartLayout";
import ProductGrid from "@components/ProductGrid";
import sources from "sources";
import useModal from "hooks/useModal";
import CustomModal from "@components/CustomModal";

export default function Home({
	newProducts,
	saleProducts,
	brands,
	brandProducts,
}) {
	const { open, closeModal, openModal } = useModal();
	return (
		<div className="relative w-full">
			<button className="btn btn-default" onClick={openModal}>
				Show Modal
			</button>
			<CustomModal show={open} onClose={closeModal} />
			<div className="bg-background-color h-full w-full absolute -z-20" />
			<div className="bg-[url('/images/bg.png')] bg-repeat opacity-10 h-full w-full absolute -z-10" />
			<div className="grid grid-flow-col grid-cols-6 z-40 justify-center">
				<div className="col-span-6 lg:col-span-4 flex flex-col justify-center px-16 lg:px-44 py-3 gap-3">
					<div className="grid grid-cols-4 lg:grid-cols-6 bg-white w-full rounded-2xl p-10 py-5">
						{brands.map((brand, index) => (
							<div className="p-4 flex items-center justify-center m-0 cursor-pointer border-1">
								<Image
									src={`${sources.brand}${brand.guidName}`}
									width={140}
									height={140}
									objectFit="contain"
								/>
							</div>
						))}
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
						<ProductGrid
							onClick={openModal}
							data={newProducts}
							title="New Products"
							size={newProducts.length}
						/>
						<ProductGrid
							onClick={openModal}
							data={saleProducts}
							title="Sale Products"
							size={saleProducts.length}
						/>
						{brandProducts.map((brandProduct, i) => (
							<ProductGrid
								onClick={openModal}
								key={`${i}.--!`}
								data={brandProduct.data}
								title={brandProduct.title}
								size={brandProduct.data.length}
							/>
						))}
					</div>
				</div>

				<div className="col-span-2">
					<CartLayout />
				</div>
			</div>
		</div>
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
				`${API_URL}/api/Product/GetSaleProducts?lang=${"tr"}&sourceProof=${SOURCE_PROOF}`
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
				data: brandProduct,
				title: brandName,
			});
		})
	);

	return {
		props: { newProducts, saleProducts, brands, brandProducts },
	};
}
