<script>
    import DesignerEditable from '$lib/components/widgets/designerEditable.svelte'

    export let uniqueId
    export let root
    export let currentPath = ''
    $: pathWithLawbotics = currentPath + '/' + uniqueId
    $: pathId = pathWithLawbotics.substring('/Lawbotics/'.length)
</script>

<details>
    <summary>
        {uniqueId}
    </summary>
    {#if Object.keys(root).length >= 1}
        {#each Object.keys(root) as key}
            <!-- Svelte recursion ( ◕o◕) -->
            <svelte:self
                root={root[key]}
                uniqueId={key}
                currentPath={pathWithLawbotics}
            />
        {/each}
    {:else}
        <b>{pathId}</b>
        <br />
        <DesignerEditable uniqueId={pathId}
            >{pathWithLawbotics}</DesignerEditable
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
