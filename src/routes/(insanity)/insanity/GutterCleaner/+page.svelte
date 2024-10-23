<script>
    import { base } from '$app/paths'
    import { debug, init } from '$lib/Insanity/designStore.js'
    import { onMount } from 'svelte'
    import DesignerEditable from '$lib/Insanity/designerEditable.svelte'

    let nextChange = Promise.resolve({
        before: 'Try refreshing',
        after: 'The page',
    })

    function getNextChange() {
        nextChange = fetch('/insanity/api/design/change').then((data) =>
            data.json()
        )
        return nextChange
    }

    function changeDesign(event, uniqueId) {
        const newText = event.target.value

        fetch('/insanity/api/design/edit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [uniqueId]: newText,
            }),
        })

        getNextChange()
    }

    function AcceptChange() {
        //I want the changeDesign to go through first, so putting a small timeout on this just in case.
        setTimeout(() => {
            fetch('/insanity/api/design/change', {
                method: 'POST',
            })
        }, 100)
        setTimeout(getNextChange, 120)
    }
    function DeleteChange() {
        //I want the changeDesign to go through first, so putting a small timeout on this just in case.
        setTimeout(() => {
            fetch('/insanity/api/design/change', {
                method: 'DELETE',
            })
        }, 100)
        setTimeout(getNextChange, 120)
    }

    onMount(async () => {
        debug.subscribe((val) => {
            //Do something
            if (val) {
                getNextChange()
            }
        })
        init()
    })
</script>

<div class="dadBod">
    {#if !$debug}
        Can't use insanity gutter cleaner on dev server!
    {:else}
        <h1>Which is better?</h1>

        {#await nextChange}
            Loading next change...
        {:then change}
            {#if !change}
                Something went wrong. Try refreshing.
            {:else if change === true}
                Gutters are cleaned! No more changes!
            {:else}
                <table><tbody>
                    <tr>
                        <td>
                            <code>
                                Unique Id: {change.key}
                            </code>
                        </td>
                        <td>
                            <code>
                                Click off of the text area
                                <br />
                                to save your changes.
                            </code>
                        </td>
                    </tr>

                    <tr>
                        <th>Before</th>
                        <th>After</th>
                    </tr>

                    <tr>
                        <td>
                            <textarea disabled
                                >{change.before ??
                                    'This change is new!'}</textarea
                            >
                        </td>
                        <td>
                            <textarea
                                on:change={(e) => {
                                    changeDesign(e, change.key)
                                }}>{change.after}</textarea
                            >
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea disabled
                                >{JSON.stringify(change.before) ??
                                    'This change is new!'}</textarea
                            >
                        </td>
                        <td>
                            <textarea disabled
                                >{JSON.stringify(change.after)}</textarea
                            >
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <DesignerEditable uniqueId={change.key}>
                                Wait a sec, getting changes...
                            </DesignerEditable>
                            <br />
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button on:click={DeleteChange}
                                >Delete Change</button
                            >
                        </td>
                        <td>
                            <button on:click={AcceptChange}
                                >Accept Change</button
                            >
                        </td>
                    </tr>
                </tbody></table>
            {/if}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {/if}

    <br />
    <br />
    <a href="{base}/insanity">Go insane!</a>
    <br />
    <a href="{base}/">Go Home</a>
</div>

<style>
    .dadBod {
        position: absolute;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    h1 {
        text-align: center;
    }
    table {
        width: 100%;
        height: 30%;
    }
    tr {
        width: 100%;
    }
    textarea {
        width: 100%;
        height: 25vh;
    }
    td {
        text-align: center;
    }
</style>
