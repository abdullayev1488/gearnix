import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { useSelector, useDispatch } from "react-redux"
import { setPriceRange } from "@/redux/slice/filterSlice"
import { useDebounce } from "@/hooks/useDebounce"

const RangeSlider = () => {
    const dispatch = useDispatch();
    const { filters, maxRange } = useSelector(state => state.filter);
    const [localValue, setLocalValue] = useState(filters.priceRange);

    const debouncedValue = useDebounce(localValue, 500);

    // Sync local state with Redux state (e.g., if filters are cleared)
    useEffect(() => {
        setLocalValue(filters.priceRange);
    }, [filters.priceRange]);

    // Dispatch Redux action when debounced value changes
    useEffect(() => {
        if (debouncedValue[0] !== filters.priceRange[0] || debouncedValue[1] !== filters.priceRange[1]) {
            dispatch(setPriceRange(debouncedValue));
        }
    }, [debouncedValue, dispatch, filters.priceRange]);

    const handlePriceChange = (value) => {
        setLocalValue(value);
    };

    return (
        <div className="flex w-full flex-col gap-2 px-1 mt-4">
            <Slider
                min={0}
                max={maxRange}
                step={1}
                onValueChange={handlePriceChange}
                value={[localValue[0], localValue[1]]}
            />
            <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">$0.00</span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">${maxRange.toFixed(2)}</span>
            </div>
            <div className="mt-4">
                <span className="text-[14px] font-medium text-gray-900">
                    Range ($): <span className="font-bold">{localValue[0]} — {localValue[1]}</span>
                </span>
            </div>
        </div>
    )
}

export default RangeSlider