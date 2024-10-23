import { env } from 'node:process'
import { fileURLToPath } from 'url'
import fs from 'node:fs/promises'
import path from 'node:path'
import syncFs from 'node:fs'

let debug = true //Put some env variable here instead

export async function editJson(filePath: string, designEdits: Object) {
    function onError() {
        //truncates by default
        syncFs.writeFileSync(
            filePath,
            JSON.stringify(designEdits, null, '\t'),
            { encoding: 'utf-8' }
        )
        return {}
    }

    return fs
        .readFile(filePath, { encoding: 'utf-8' })
        .then((data) => JSON.parse(data), onError)
        .then(function (data) {
            for (let key of Object.keys(designEdits)) {
                if (designEdits[key] == null) {
                    delete data[key]
                    delete designEdits[key]
                }
            }

            Object.assign(data, designEdits)

            //truncates by default
            syncFs.writeFileSync(filePath, JSON.stringify(data, null, '\t'), {
                encoding: 'utf-8',
            })
        }, onError)
}

//Path to lib/server/Insanity
export function absoluteFilePathAssets(fileName = 'designTextChanges.json') {
    const __filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(__filename)
	
	function isBuilt(dirname){
		return dirname.indexOf('/server/chunks') > 0 ||
            dirname.indexOf('\\server\\chunks') > 0;
	}
	
    return path.join(
        dirname,
			isBuilt(dirname)
            ? '../../../../src/lib/server/Insanity'	//This is probably wrong
            : '.',
        //'assets',
        fileName
    )
}

//returns Pick<boolean, Object[]>
//I can't define that because ts hates me and I hate it :)
export async function editDesign(designEdits: Object) {
    if (!debug) return false //Forbidden

    let oldText = await fs
        .readFile(absoluteFilePathAssets('designText.json'), {
            encoding: 'utf-8',
        })
        .then(
            (data) => JSON.parse(data),
            () => ({})
        )

    //Remove unchanged stuff, compared to oldText
    for (let key of Object.keys(designEdits)) {
        if (oldText[key] == designEdits[key]) {
            designEdits[key] = null
        }
    }

    const __filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(__filename)
    return await editJson(
        absoluteFilePathAssets('designTextChanges.json'),
        designEdits
    )
}

export function canEditDesign() {
    return debug
}
