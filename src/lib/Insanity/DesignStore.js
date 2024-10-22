import { writable } from 'svelte/store'
import { base } from '$app/paths'

export const debug = writable(false)
let debugVal = false
debug.subscribe((val) => {
    debugVal = val
})

let initialized = false
export async function init() {
    if (initialized) return debugVal
    initialized = true
    return fetch(base + '/frontApi/design/edit').then(async (data) => {
        const str = await data.text()
        //can log('debug data is', str)
        debug.set(str.trim() == 'true')
        return str.trim() == 'true'
    })
}
