import { absoluteFilePathAssets } from '$lib/server/Insanity/editDesign.ts'
import fs from 'node:fs'
import { error, json } from '@sveltejs/kit'
import { editJson, editDesign, canEditDesign } from '$lib/server/Insanity/editDesign.ts'

async function getNextChange() {
    const changes = JSON.parse(
        fs
            .readFileSync(absoluteFilePathAssets('designTextChanges.json'), {
                encoding: 'utf-8',
            })
            .trim()
    )
    if (typeof changes != 'object' || Object.keys(changes).length < 1) {
        const ALL_DONE = true
        return ALL_DONE
    }
    const text = JSON.parse(
        fs
            .readFileSync(absoluteFilePathAssets('designText.json'), {
                encoding: 'utf-8',
            })
            .trim()
    )
    const NEXT_CHANGE = Object.keys(changes)[0]
    return {
        key: NEXT_CHANGE,
        before: text[NEXT_CHANGE],
        after: changes[NEXT_CHANGE],
    }
}

export async function GET() {
    try {
        return json(await getNextChange())
    } catch (bruh) {
        return error(500, bruh.message)
    }
}

//Accept change
export async function POST() {
    if (!canEditDesign()) {
        return new Response('', { status: 403 })
    }

    const nextChange = await getNextChange()

    const edits = {
        [nextChange.key]: nextChange.after,
    }

    await editJson(absoluteFilePathAssets('designText.json'), edits)

    await editDesign(edits) //editDesign will now think the change is redundant, so it'll delete it from designTextChanges

    return new Response('', { status: 200 })
}

//Delete change
export async function DELETE() {
    if (!canEditDesign()) {
        return new Response('', { status: 403 })
    }

    const nextChange = await getNextChange()

    await editDesign({
        [nextChange.key]: null,
    })

    return new Response('', { status: 200 })
}
