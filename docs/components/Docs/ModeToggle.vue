<template>
    <button
        type="button"
        class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
        aria-label="Toggle dark mode"
        @click="toggleMode()">
            <IconsSun class="h-5 w-5 stroke-zinc-900 dark:hidden" />
            <IconsMoon class="hidden h-5 w-5 stroke-white dark:block" />
    </button>
</template>

<script setup>
const colorMode = useColorMode();

const toggleMode = () => {
    colorMode.value = ( colorMode.value == 'dark' ? 'light' : 'dark' );
}
</script>