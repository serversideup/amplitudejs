<template>
    <DocsEyebrow 
        v-if="tag != '' && label != ''"
        :tag="tag"
        :label="label"/>

    <h2 ref="headingRef" :id="id" :class="[tag != '' || label != '' ? 'mt-2 scroll-mt-32' : 'scroll-mt-24']">
        <DocsAnchor v-if="anchor" :href="'#'+id" :inView="inView">
            <slot v-if="text == ''"/>
            <span v-else v-text="text"></span>
        </DocsAnchor>
    </h2>
</template>

<script setup>
/**
 * Look at the prose h2 for what we can do!
 */
const props = defineProps({
    level: {
        default: 2
    },
    tag: {
        default: ''
    },
    label: {
        default: ''
    },
    anchor: {
        default: true
    },
    id: {
        default: ''
    },
    text: {
        default: ''
    }
})

const headingRef = ref( null );
const inView = ref(true);
</script>