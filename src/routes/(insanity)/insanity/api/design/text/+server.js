import { absoluteFilePathAssets } from '$lib/server/Insanity/editDesign.ts'
import fs from 'node:fs'
import { json } from '@sveltejs/kit'

export async function GET() {
    try {
        const data = JSON.parse(
            fs
                .readFileSync(absoluteFilePathAssets('designText.json'), {
                    encoding: 'utf-8',
                })
                .trim()
        )
        return json(data)
    } catch (error) {
        return error(500, error.message)
    }
}
