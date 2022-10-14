import {getByBlockHash} from "$lib/data/get-data.js";

export async function load({params}) {
    const hash = params.hash
    let res = await getByBlockHash(hash)
    if (res.result.status) {
        return res.result.block
    } else return []
}


