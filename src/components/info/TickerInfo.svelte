<script lang="ts">
    import { tickerStore } from '../../stores/tickerStore';
    import { formatDynamicDecimal } from '../../utils/utils';
    import { _ } from 'svelte-i18n';

    function formatVolume(volume: number | undefined): string {
        if (volume === undefined) return '-';
        if (volume >= 1_000_000_000) {
            return `${(volume / 1_000_000_000).toFixed(2)}B`;
        }
        if (volume >= 1_000_000) {
            return `${(volume / 1_000_000).toFixed(2)}M`;
        }
        if (volume >= 1_000) {
            return `${(volume / 1_000).toFixed(2)}K`;
        }
        return volume.toFixed(2);
    }
</script>

{#if $tickerStore.isLoading}
    <div class="ticker-info-container shimmer">
        <div class="info-item-placeholder"></div>
        <div class="info-item-placeholder"></div>
        <div class="info-item-placeholder"></div>
    </div>
{:else if $tickerStore.stats}
    <div class="ticker-info-container">
        <div class="info-item">
            <span class="label">{$_('ticker.priceChange24h')}</span>
            <span class="value" class:positive={$tickerStore.stats.priceChangePercent.isPositive()} class:negative={!$tickerStore.stats.priceChangePercent.isPositive()}>
                {formatDynamicDecimal($tickerStore.stats.priceChangePercent, 2)}%
                ({formatDynamicDecimal($tickerStore.stats.priceChange, 2)})
            </span>
        </div>
        <div class="info-item">
            <span class="label">{$_('ticker.highLow24h')}</span>
            <span class="value">
                H: {formatDynamicDecimal($tickerStore.stats.high, 2)} | L: {formatDynamicDecimal($tickerStore.stats.low, 2)}
            </span>
        </div>
        <div class="info-item">
            <span class="label">{$_('ticker.volume24h')}</span>
            <span class="value">
                {formatVolume($tickerStore.stats.volume.toNumber())}
            </span>
        </div>
    </div>
{/if}

<style>
    .ticker-info-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        padding: 1rem;
        background-color: var(--input-bg);
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
    }
    .info-item {
        display: flex;
        flex-direction: column;
    }
    .label {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 0.25rem;
    }
    .value {
        font-size: 1rem;
        font-weight: 500;
    }
    .positive {
        color: var(--success-color);
    }
    .negative {
        color: var(--danger-color);
    }
    .shimmer .info-item-placeholder {
        height: 40px;
        background-color: var(--input-bg-secondary);
        border-radius: 0.25rem;
    }
</style>
