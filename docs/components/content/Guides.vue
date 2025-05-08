<template>
    <div class="my-16 xl:max-w-none">
        <AppHeading2 id="guides">
            Guides
        </AppHeading2>
        <div class="not-prose mt-4 grid grid-cols-1 gap-8 border-t pt-10 border-white/5 sm:grid-cols-2 xl:grid-cols-4">
            <slot/>
        </div>
    </div>
</template>

<script setup>
const guides = ref([
    {
        href: '/authentication',
        name: 'Authentication',
        description: 'Learn how to authenticate your API requests.',
    },
    {
        href: '/pagination',
        name: 'Pagination',
        description: 'Understand how to work with paginated responses.',
    },
    {
        href: '/errors',
        name: 'Errors',
        description: 'Read about the different types of errors returned by the API.',
    },
    {
        href: '/webhooks',
        name: 'Webhooks',
        description: 'Learn how to programmatically configure webhooks for your app.',
    },
])
</script>