import {writable} from "svelte/store";

export const appState = writable({
    loading: true
})