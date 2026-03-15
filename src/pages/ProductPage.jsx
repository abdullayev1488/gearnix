import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import api from "@/axios/axios";
import { ProductDetailsSection } from "@/sections/product/ProductDetailsSection";
import { ProductTabsSection } from "@/sections/product/ProductTabsSection";
import { RelatedProductsSection } from "@/sections/product/RelatedProductsSection";

export const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/product/${id}`);
                if (data.success) {
                    setProduct(data.data.product);
                } else {
                    navigate("/shop");
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
                navigate("/shop");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        } else {
            navigate("/shop");
        }
    }, [id, navigate]);

    if (loading) {
        return (
            <main className="pt-[80px]">
                <div className="flex items-center justify-center py-40">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-100 border-t-[#ff0080] rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-[#ff0080]/10 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!product) return null;

    return (
        <main className="pt-[80px]">
            <ProductDetailsSection product={product} />
            <ProductTabsSection product={product} />
            <RelatedProductsSection />
        </main>
    );
};
