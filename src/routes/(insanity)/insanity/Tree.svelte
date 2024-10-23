<script lang="ts">
    import DesignerEditable from '$lib/insanity/designerEditable.svelte'

    export let uniqueId: string[]
    export let root
</script>

<details>
    <summary>
        {(uniqueId.length === 0)? "Insanity" : uniqueId[uniqueId.length - 1]}
    </summary>
    {#if Object.keys(root).length >= 1}
        {#each Object.keys(root) as key}
            <!-- Svelte recursion ( ◕o◕) -->
            <svelte:self
                root={root[key]}
                uniqueId={[...uniqueId, key]}
            />
        {/each}
    {:else}
        <b>{uniqueId.join('/')}</b>
        <br />
        <DesignerEditable uniqueId={uniqueId.join('/')}
            >{uniqueId.join('/')}</DesignerEditable
        >
    {/if}
</details>

<style>
    b {
        font-family: monospace;
    }
    details {
        padding-left: 0.5rem;
    }
    b, summary {
        font-size: 125%;
    }
</style>
