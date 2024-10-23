import { editDesign, canEditDesign } from '$lib/server/Insanity/editDesign.ts'
import { json } from '@sveltejs/kit'

export async function POST({ request }) {
    const designEdits = await request.json()

    await editDesign(designEdits)

    return new Response('', { status: 200 })
}

export async function GET() {
    return json(canEditDesign())
}
