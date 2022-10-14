import {getTransaction} from "$lib/data/get-data.js";

export async function load({params}) {
    const hash = params.hash
    let res = await getTransaction(hash)
    if (res.result.status) {
        return res.result
    } else return []
}


