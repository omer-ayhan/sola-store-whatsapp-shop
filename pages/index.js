import ProductGrid from "@components/ProductGrid";
import axios from "axios";
import Image from "next/image";
import sources from "sources";

export default function Home({ newProducts, saleProducts, brands }) {
	return (
		<div className="relative  w-full">
			<div className="bg-background-color h-full w-full absolute -z-20" />
			<div className="bg-[url('/images/bg.png')] bg-repeat opacity-10 h-full w-full absolute -z-10" />
			<div className="grid grid-flow-col grid-cols-6 z-40">
				<div className="col-span-6 lg:col-span-5 flex flex-col justify-center px-24 lg:px-56 py-3 gap-3">
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
							data={newProducts}
							title="New Products"
							size={newProducts.length}
						/>
						<ProductGrid
							data={saleProducts}
							title="Sale Products"
							size={saleProducts.length}
						/>
					</div>
				</div>

				<div className="col-span-1"></div>
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

	return {
		props: { newProducts, saleProducts, brands },
	};
}
