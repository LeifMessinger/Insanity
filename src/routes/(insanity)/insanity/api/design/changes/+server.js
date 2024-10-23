import { absoluteFilePathAssets } from '$lib/server/Insanity/editDesign.ts'
import fs from 'node:fs'
import { error, json } from '@sveltejs/kit'

export async function GET() {
    try {
        const data = JSON.parse(
            fs
                .readFileSync(
                    absoluteFilePathAssets('designTextChanges.json'),
                    {
                        encoding: 'utf-8',
                    }
                )
                .trim()
        )
        return json(data)
    } catch (bruh) {
        return error(500, bruh.message)
    }
}
