import {writable} from "svelte/store";

export const explorerData = writable({
    node: {},
    block: null,
    blocks: [],
    transactions: [],
    newBlock: false,
})