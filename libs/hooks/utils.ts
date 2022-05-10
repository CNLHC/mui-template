import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../state";
import { ActCollapse, ActSetGlobalState } from "../state/global";

export function useDebounce<T>(value: T, delay: number): T {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}

export function useSidebar() {
    const dispatch = useDispatch()
    const opened = useTypedSelector(e => e.GlobalReducer.show_sidebar)
    const collapse_state = useTypedSelector(e => e.GlobalReducer.collapse_state)

    return {
        show: useCallback(() => dispatch(ActSetGlobalState({ show_sidebar: true })), [dispatch]),
        hide: useCallback(() => dispatch(ActSetGlobalState({ show_sidebar: false })), [dispatch]),
        expand: useCallback((key: string) => dispatch(ActCollapse({ key, isCollapsed: false })), [dispatch]),
        collapse: useCallback((key: string) => dispatch(ActCollapse({ key, isCollapsed: true })), [dispatch]),
        collapse_state,
        opened,
    }
}