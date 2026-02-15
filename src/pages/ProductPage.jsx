import { TopSection } from "../sections/TopSection"
import { ProductDetailsSection } from "../sections/product/ProductDetailsSection"
import { ProductTabsSection } from "../sections/product/ProductTabsSection"
import { RelatedProductsSection } from "../sections/product/RelatedProductsSection"

export const ProductPage = () => {
    const breadcrumbs = [
        { label: "Home", path: "/" },
        { label: "Product", path: null }
    ]
    return (
        <main className='pt-[80px]'>
            <TopSection title="Product" breadcrumbs={breadcrumbs} />
            <ProductDetailsSection />
            <ProductTabsSection />
            <RelatedProductsSection />
        </main>
    )
}
