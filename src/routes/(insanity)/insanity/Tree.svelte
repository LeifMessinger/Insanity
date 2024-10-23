<script>
    import DesignerEditable from '$lib/insanity/designerEditable.svelte'

    export let uniqueId
    export let root
</script>

<details>
    <summary>
        {uniqueId == "" ? "Insanity" : uniqueId}
    </summary>
    {#if Object.keys(root).length >= 1}
        {#each Object.keys(root) as key}
            <!-- Svelte recursion ( ◕o◕) -->
            <svelte:self
                root={root[key]}
                uniqueId={key}
            />
        {/each}
    {:else}
        <b>{uniqueId}</b>
        <br />
        <DesignerEditable {uniqueId}
            >{uniqueId}</DesignerEditable
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
</style>
