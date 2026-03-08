import { Slider } from "@/components/ui/slider"
import { useSelector, useDispatch } from "react-redux"
import { setPriceRange } from "@/redux/slice/filterSlice"

const RangeSlider = () => {
    const dispatch = useDispatch();
    const { filters, maxRange } = useSelector(state => state.filter);

    const handlePriceChange = (value) => {
        dispatch(setPriceRange(value));
    };

    return (
        <div className="flex w-full flex-col gap-2 px-1 mt-4">
            <Slider
                min={0}
                max={maxRange}
                step={1}
                onValueChange={handlePriceChange}
                value={[filters.priceRange[0], filters.priceRange[1]]}
            />
            <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">$0.00</span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">${maxRange.toFixed(2)}</span>
            </div>
            <div className="mt-4">
                <span className="text-[14px] font-medium text-gray-900">
                    Range ($): <span className="font-bold">{filters.priceRange[0]} — {filters.priceRange[1]}</span>
                </span>
            </div>
        </div>
    )
}

export default RangeSlider