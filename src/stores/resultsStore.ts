import { writable } from 'svelte/store';
import type { AppState } from './types';

export const initialResultsState: Pick<AppState,
    'positionSize' |
    'requiredMargin' |
    'netLoss' |
    'entryFee' |
    'liquidationPrice' |
    'breakEvenPrice' |
    'totalRR' |
    'totalNetProfit' |
    'totalPercentSold' |
    'riskAmountCurrency' |
    'totalFees' |
    'maxPotentialProfit' |
    'calculatedTpDetails' |
    'showTotalMetricsGroup' |
    'showAtrFormulaDisplay' |
    'atrFormulaText' |
    'isAtrSlInvalid'
> = {
    positionSize: '-',
    requiredMargin: '-',
    netLoss: '-',
    entryFee: '-',
    liquidationPrice: '-',
    breakEvenPrice: '-',
    totalRR: '-',
    totalNetProfit: '-',
    totalPercentSold: '-',
    riskAmountCurrency: '-',
    totalFees: '-',
    maxPotentialProfit: '-',
    calculatedTpDetails: [],
    showTotalMetricsGroup: false,
    showAtrFormulaDisplay: false,
    atrFormulaText: '',
    isAtrSlInvalid: false,
};

export const resultsStore = writable(initialResultsState);
