import { writable } from 'svelte/store';
import type { TickerStats } from '../services/apiService';

export interface TickerStore {
    stats: TickerStats | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: TickerStore = {
    stats: null,
    isLoading: false,
    error: null,
};

function createTickerStore() {
    const { subscribe, set, update } = writable<TickerStore>(initialState);

    return {
        subscribe,
        setStats: (stats: TickerStats) => update(store => ({ ...store, stats, isLoading: false, error: null })),
        setLoading: () => update(store => ({ ...store, isLoading: true, error: null })),
        setError: (error: string) => update(store => ({ ...store, isLoading: false, error })),
        clear: () => set(initialState),
    };
}

export const tickerStore = createTickerStore();
