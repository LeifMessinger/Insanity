<script>
    import { debug, init } from '$lib/Insanity/DesignStore.js'
    import { onMount } from 'svelte'

    let spanThingy = $state(false)

    async function updateText(debugVal) {
        const awaitingText = fetch('frontApi/design/text').then(
            (res) => res.json(),
            () => {
                return {}
            }
        )

        const awaitingChanges = debugVal
            ? fetch('frontApi/design/changes').then(
                  (res) => res.json(),
                  () => {
                      return {}
                  }
              )
            : Promise.resolve({})

        return Promise.all([awaitingText, awaitingChanges]).then((data) => {
            const [allText, changes] = data

            if (debugVal && changes[uniqueId]) {
                if (spanThingy) {
                    spanThingy.innerHTML = changes[uniqueId]

                    spanThingy.style.setProperty(
                        'text-decoration',
                        'underline wavy rgb(255, 163, 88)'
                    )
                }
            } else {
                if (spanThingy) {
                    if (debugVal) {
                        spanThingy.style.setProperty(
                            'text-decoration',
                            'underline wavy rgb(88, 255, 110)'
                        )
                    }
                    if (allText[uniqueId]) {
                        spanThingy.innerHTML = allText[uniqueId]
                    }
                }
            }
        })
    }

    /**
     * @typedef {Object} Props
     * @property {boolean} [editable]
     * @property {any} [hintEditable]
     * @property {any} uniqueId
     * @property {any} [onContentsChange]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let {
        editable = true,
        hintEditable = editable,
        uniqueId,
        onContentsChange = async function () {
        if (!editable) return false
        if (!uniqueId) return false
        function getTextStringFromElement(elm) {
            //Ok, this literally works.
            //So, the browser replaces newlines with <div>s when using contenteditable
            //But that's just for the browser. The dom has [text, text, text ...] which is [line, newline, line ...]
            //So I can just textContent it
            return elm.innerHTML
            /*Array.from(elm.childNodes)
                .map((node) => node.textContent.trim())
                .join('\n')
                .trim()*/
        }

        await fetch('frontApi/design/edit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [uniqueId]: getTextStringFromElement(this),
            }),
        })

        setTimeout(() => {
            updateText(true)
        }, 100) //You can only change the content if it's true, in theory.
    },
        children
    } = $props();

    onMount(async () => {
        debug.subscribe((val) => {
            updateText(val)
        })
        init()
    })
</script>

<span
    bind:this={spanThingy}
    class={$debug ? (hintEditable ? 'hint' : '') : ''}
    contenteditable={$debug && editable}
    onfocusout={$debug ? onContentsChange : () => {}}
>
    {@render children?.()}
</span>

<style>
</style>
