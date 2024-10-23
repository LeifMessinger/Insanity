<script>
    import { base } from '$app/paths'
    import Tree from './Tree.svelte'

    import { assignRecursively } from '$lib/Insanity/helpers.js'
    import { onMount } from 'svelte'

    function createNestedObject(keys) {
        const result = {}
        let currentLevel = result
        for (const key of keys) {
            currentLevel[key] = {}
            currentLevel = currentLevel[key]
        }
        return result
    }

    function makeTreeFromPaths(paths) {
        const obj = {}
        for (let path of paths) {
            assignRecursively(obj, createNestedObject(path))
        }

        return obj
    }

    let uniqueIdsPromise = Promise.resolve(['bruh'])
    onMount(() => {
        uniqueIdsPromise = fetch('/insanity/api/design/text')
            .then(
                (res) => res.json(),
                () => {
                    return {}
                }
            )
            .then((data) => Object.keys(data))
            .then((uniqueIds) => {
                const paths = uniqueIds.map((uniqueId) => {
                    return uniqueId.split('/')
                })
                return paths
            })
            .then((paths) => {
                return makeTreeFromPaths(paths)
            })
    })
</script>

<a href="{base}/insanity/GutterCleaner">Clean the gutters!</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
    href="/">Go Home</a
>

<br />
<br />

{#await uniqueIdsPromise}
    <p>Loading insanity</p>
{:then uniqueIdsTree}
    <Tree root={uniqueIdsTree} uniqueId={''}></Tree>
{:catch error}
    <p style="color: red">
        {error.message}
        <br />
        {error.stack}
    </p>
{/await}
