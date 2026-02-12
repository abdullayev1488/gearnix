import { TopSection } from "../sections/TopSection";
import { ShopCarouselSection } from "../sections/shop/ShopCarouselSection";
import { ShopContent } from "../sections/shop/ShopContent";

export const ShopPage = () => {
    const breadcrumbs = [
        { label: "Home", path: "/" },
        { label: "Shop", path: null }
    ]
    return (
        <main className='pt-[80px]'>
            <TopSection title="Shop" breadcrumbs={breadcrumbs} />
            <ShopCarouselSection />
            <ShopContent />
        </main>
    )
}
