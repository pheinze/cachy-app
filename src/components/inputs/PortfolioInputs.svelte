<script lang="ts">
    import { numberInput } from '../../utils/inputUtils';
    import { _ } from '../../locales/i18n';
    import { onboardingService } from '../../services/onboardingService';
    import { createEventDispatcher } from 'svelte';
    import { icons } from '../../lib/constants';
    import { updateTradeStore } from '../../stores/tradeStore';

    export let accountSize: number | null;
    export let riskPercentage: number | null;
    export let riskAmount: number | null;
    export let isRiskAmountLocked: boolean;
    export let isPositionSizeLocked: boolean;

    const dispatch = createEventDispatcher();

    function handleLockClick() {
        dispatch('toggleRiskAmountLock');
    }

    const format = (val: number | null) => (val === null || val === undefined) ? '' : String(val);

    function handleAccountSizeInput(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        updateTradeStore(s => ({ ...s, accountSize: value === '' ? null : parseFloat(value) }));
    }

    function handleRiskPercentageInput(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        updateTradeStore(s => ({ ...s, riskPercentage: value === '' ? null : parseFloat(value) }));
    }

    function handleRiskAmountInput(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        updateTradeStore(s => ({ ...s, riskAmount: value === '' ? null : parseFloat(value) }));
    }
</script>

<div>
    <h2 class="section-header !mt-6">{$_('dashboard.portfolioInputs.header')}</h2>
    <div class="grid grid-cols-3 gap-4">
        <div>
            <label for="account-size" class="input-label text-xs">{$_('dashboard.portfolioInputs.accountSizeLabel')}</label>
            <input id="account-size" type="text" use:numberInput={{ maxDecimalPlaces: 4 }} value={format(accountSize)} on:input={handleAccountSizeInput} class="input-field w-full px-4 py-2 rounded-md" placeholder="{$_('dashboard.portfolioInputs.accountSizePlaceholder')}" on:input={onboardingService.trackFirstInput}>
        </div>
        <div>
            <label for="risk-percentage" class="input-label text-xs">{$_('dashboard.portfolioInputs.riskPerTradeLabel')}</label>
            <input id="risk-percentage" type="text" use:numberInput={{ noDecimals: true, isPercentage: true, maxValue: 100, minValue: 0 }} value={format(riskPercentage)} on:input={handleRiskPercentageInput} class="input-field w-full px-4 py-2 rounded-md" placeholder="{$_('dashboard.portfolioInputs.riskPerTradePlaceholder')}" on:input={onboardingService.trackFirstInput} disabled={isRiskAmountLocked || isPositionSizeLocked}>
        </div>
        <div>
            <label for="risk-amount" class="input-label text-xs">{$_('dashboard.portfolioInputs.riskAmountLabel')}</label>
            <div class="relative">
                <input id="risk-amount" type="text" use:numberInput={{ maxDecimalPlaces: 2 }} value={format(riskAmount)} on:input={handleRiskAmountInput} class="input-field w-full px-4 py-2 rounded-md pr-10" placeholder="e.g. 100" disabled={isPositionSizeLocked}>
                <button class="absolute top-1/2 right-2 -translate-y-1/2 btn-lock-icon" on:click={handleLockClick} title="{$_('dashboard.portfolioInputs.toggleRiskAmountLockTitle')}" disabled={isPositionSizeLocked}>
                    {@html isRiskAmountLocked ? icons.lockClosed : icons.lockOpen}
                </button>
            </div>
        </div>
    </div>
</div>