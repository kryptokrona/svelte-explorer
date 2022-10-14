import { error, json } from "@sveltejs/kit";
import { getBlock, getByBlockHash } from "$lib/data/get-data.js";

export async function GET({params}) {
    const input = params.input
    const numbers = /^[0-9]+$/;

    let data
    const block = await getByBlockHash(input)

    if (input.match(numbers)) {
        data = await getBlock(input)
    }

    if (block.error) {
        throw error('404', 'Not found')
    } else {
        data = block
    }

    return json(data)
}