import { ProductDetailsSection } from "../sections/product/ProductDetailsSection"
import { ProductTabsSection } from "../sections/product/ProductTabsSection"
import { RelatedProductsSection } from "../sections/product/RelatedProductsSection"

export const ProductPage = () => {
    return (
        <main className='pt-[80px]'>
            <ProductDetailsSection />
            <ProductTabsSection />
            <RelatedProductsSection />
        </main>
    )
}
