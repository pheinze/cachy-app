<script lang="ts">
    import { updateVisualBar } from '../../services/uiManager';
    import type { VisualBarData } from '../../services/uiManager';
    import { _ } from '../../locales/i18n';
    import type { IndividualTpResult } from '../../stores/types';

    export let entryPrice: number | null;
    export let stopLossPrice: number | null;
    export let tradeType: string;
    export let targets: Array<{ price: number | null; percent: number | null; isLocked: boolean }>;
    export let calculatedTpDetails: IndividualTpResult[];

    let visualBarData: VisualBarData = { visualBarContent: [], markers: [] };

    $: {
        visualBarData = updateVisualBar(
            { entryPrice, stopLossPrice, tradeType },
            targets,
            calculatedTpDetails
        );
    }

</script>

<section class="visual-bar-container md:col-span-2">
    <h2 class="section-header text-center !mb-4">{$_('dashboard.visualBar.header')}</h2>
    <div
        class="visual-bar"
        role="img"
        aria-label="{$_('dashboard.visualBar.ariaLabel')}"
    >
        {#each visualBarData.visualBarContent as item}
            <div class="{item.type}" style="left: {item.style.left}; width: {item.style.width};"></div>
        {/each}
        {#each visualBarData.markers as marker}
            {@const tpDetail = calculatedTpDetails.find(d => d.index === marker.index)}
            <div
                class="bar-marker {marker.isEntry ? 'entry-marker' : ''} {marker.index !== undefined ? 'tp-marker' : ''}"
                style="left: {marker.pos}%; z-index: {marker.index !== undefined ? 20 - marker.index : 'auto'};"
                role="button"
                tabindex="0"
            >
                <span class="marker-label" style="transform: translateX(-50%);">{marker.label}</span>

                {#if marker.rr}
                <span class="rr-label" style="transform: translateX(-50%);">
                    {marker.rr.toFixed(2)}R
                </span>
                {/if}

                {#if tpDetail}
                    <div class="tp-tooltip">
                        <div class="tp-tooltip-line">{$_('dashboard.visualBar.netProfitLabel')} <span class="text-green-400">+${tpDetail.netProfit.toFixed(2)}</span></div>
                        <div class="tp-tooltip-line">{$_('dashboard.visualBar.rrLabel')} <span class="{tpDetail.riskRewardRatio.gte(2) ? 'text-green-400' : tpDetail.riskRewardRatio.gte(1.5) ? 'text-yellow-400' : 'text-red-400'}">{tpDetail.riskRewardRatio.toFixed(2)}</span></div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>

<style>
    .visual-bar-container { background-color: var(--bg-primary); padding: 1rem; border-radius: 0.5rem; margin-top: 1.5rem; margin-bottom: 1.5rem; position: relative; }
    .visual-bar { height: 1.5rem; position: relative; display: flex; border-radius: 0.375rem; overflow: visible; background-color: var(--bg-tertiary); }
    .loss-zone { background-color: var(--danger-color); position: absolute; height: 100%;}
    .gain-zone { background-color: var(--success-color); position: absolute; height: 100%;}
    .bar-marker { position: absolute; top: -0.25rem; bottom: -0.25rem; width: 20px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translateX(-50%); }
    .bar-marker::before { content: ''; position: absolute; left: 50%; transform: translateX(-50%); width: 4px; height: 100%; background-color: var(--text-primary); }
    .bar-marker span { position: absolute; font-size: 0.75rem; background-color: var(--bg-tertiary); padding: 0.1rem 0.3rem; border-radius: 0.25rem; white-space: nowrap; }
    .bar-marker .marker-label { bottom: 100%; margin-bottom: 1.5rem; font-size: 0.7rem; }
    .entry-marker .marker-label { top: 100%; margin-top: 0.25rem; bottom: auto; margin-bottom: 0; }
    .bar-marker .rr-label { bottom: 100%; margin-bottom: 0.75rem; background-color: transparent; font-size: 0.65rem; color: var(--text-secondary); }
    .entry-marker .rr-label { display: none; } /* Should not happen, but for safety */

    .tp-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-10px);

        visibility: hidden;
        opacity: 0;
        transition: opacity 0.2s, visibility 0.2s, transform 0.2s;

        background-color: var(--bg-tertiary);
        color: var(--text-primary);
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 60;
        pointer-events: none;
        box-shadow: var(--shadow-tooltip);
        text-align: left;
    }
    .tp-tooltip::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--bg-tertiary);
    }

    .bar-marker:hover .tp-tooltip {
        visibility: visible;
        opacity: 1;
        transform: translateX(-50%) translateY(-15px);
    }

    .tp-tooltip-line {
        display: block;
        position: relative;
        text-align: left;
        width: 100%;
    }
    .tp-tooltip-line span {
        display: inline;
        position: relative;
    }
    .tp-tooltip-line .text-green-400 {
        color: var(--success-color);
    }
    .tp-tooltip-line .text-yellow-400 {
        color: var(--warning-color);
    }
    .tp-tooltip-line .text-red-400 {
        color: var(--danger-color);
    }
</style>
