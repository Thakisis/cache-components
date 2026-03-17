import ProductList from "@/components/home/product-list";

export default  function Page() {
  return (
    <main className="flex flex-wrap justify-between max-w-300 gap-y-8 py-10 mx-auto container-products">
      <ProductList/>
    </main>
  );
}
