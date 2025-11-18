<script lang="ts">
    import { icons } from '../../lib/constants';
    import TakeProfitRow from '../shared/TakeProfitRow.svelte';
    import Tooltip from '../shared/Tooltip.svelte';
    import { createEventDispatcher } from 'svelte';
    import { app } from '../../services/app';
    import { _ } from '../../locales/i18n';
    import type { IndividualTpResult } from '../../stores/types';

    const dispatch = createEventDispatcher();

    export let targets: Array<{ price: number | null; percent: number | null; isLocked: boolean }>;
    export let calculatedTpDetails: IndividualTpResult[] = [];

    function addTakeProfitRow() {
        app.addTakeProfitRow();
    }

    function handleRemove(event: CustomEvent<number>) {
        const index = event.detail;
        // Dispatch the index to be removed. The parent component will handle the logic.
        dispatch('remove', index);
    }
</script>

<section class="mt-4 md:col-span-2">
    <h2 class="section-header">
        <span>{$_('dashboard.takeProfitTargets.header')}</span>
        <div class="flex items-center gap-2">
            <Tooltip text={$_('dashboard.takeProfitTargets.tooltip')} />
            <button id="add-tp-btn" class="btn-icon-accent" title="{$_('dashboard.takeProfitTargets.addTargetTitle')}" tabindex="-1" on:click={addTakeProfitRow}>
                {@html icons.add}
            </button>
        </div>
    </h2>
    <div id="take-profit-list" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each targets as target, i (i)}
            {@const tpDetail = calculatedTpDetails.find(d => d.index === i)}
            <TakeProfitRow
                index={i}
                price={target.price}
                percent={target.percent}
                isLocked={target.isLocked}
                tpDetail={tpDetail}
                on:remove={handleRemove}
            />
        {/each}
    </div>
</section>
