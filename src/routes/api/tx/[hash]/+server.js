import { error, json } from "@sveltejs/kit";
import { getTransaction } from "$lib/data/get-data.js";

export async function GET({params}) {
    const input = params.hash

    let data
    const tx = await getTransaction(input)

    if (tx.error) {
        throw error('404', 'Not found')
    } else {
        data = tx
    }

    return json(data)
}