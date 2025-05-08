<template>
    <button 
        type="button"
        class="group/button absolute top-3.5 right-4 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100"
        :class="{
            'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20': copied,
            'bg-white/2.5 hover:bg-white/5': !copied
        }"
        @click="copyCode()">
            <span
                class="pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300"
                :aria-hidden="copied"
                :class="{
                    '-translate-y-1.5 opacity-0': copied
                }">
                    <ClipboardIcon class="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400"/>
                    Copy
            </span>

            <span
                class="pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300"
                :aria-hidden="!copied"
                :class="{
                    'translate-y-1.5 opacity-0': !copied
                }">
            Copied!
        </span>
    </button>
</template>

<script setup>
const props = defineProps({
    code: {
        default: ''
    }
});

const copied = ref(false);

const copyCode = () => {
    window.navigator.clipboard.writeText( props.code ).then( () => {
        copied.value = true;

        setTimeout(() => {
            copied.value = false;
        }, 1000)
    })
}



</script>