<template>
    <footer class="mx-auto max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
        <div class="flex">
            <div class="flex flex-col items-start gap-3" v-if="prev != null">
                <DocsPageLink 
                    :label="'Previous'" 
                    :page="prev" 
                    :previous="true"/>
            </div>
            <div class="ml-auto flex flex-col items-end gap-3" v-if="next != null && next._path != '/docs'">
                <DocsPageLink 
                    :label="'Next'" 
                    :page="next"/>
            </div>
        </div>
    </footer>
</template>

<script setup>
const { prev, next } = useContent();
</script>