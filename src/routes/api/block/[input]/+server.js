import { error, json } from "@sveltejs/kit";
import {getBlock, getByBlockHash, getCurrentBlock} from "$lib/data/get-data.js";

export async function GET({params}) {
    const input = params.input
    const numbers = /^[0-9]+$/;

    if (input.match(numbers)) {
        return json(await getBlock(parseInt(input)))
    } else if (input === 'current') {
        return json(await getCurrentBlock())
    }

    const block = await getByBlockHash(input)

    if (block.error) {
        throw error('404', 'Not found')
    } else {
        return json(block)
    }
}