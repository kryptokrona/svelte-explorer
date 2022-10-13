import {derived, writable} from "svelte/store";

export const explorerData = writable({
    node: {},
    previousBLock: null,
    block: null,
    blocks: [],
    transactions: [],
})