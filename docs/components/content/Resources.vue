<template>
    <div class="my-16 xl:max-w-none">
        <AppHeading2 :id="'resources'">
            Resources
        </AppHeading2>
        <div class="not-prose mt-4 grid grid-cols-1 gap-8 border-t pt-10 border-white/5 sm:grid-cols-2 xl:grid-cols-4">
            <Resource v-for="resource in resources"
                :key="resource.href"
                :resource="resource"/>
        </div>
    </div>
</template>

<script setup>
const resources = ref([
    {
        href: '/contacts',
        name: 'Contacts',
        description: 'Learn about the contact model and how to create, retrieve, update, delete, and list contacts.',
        icon: 'icons-user',
        pattern: {
            y: 16,
            squares: [
                [0, 1],
                [1, 3],
            ],
        },
    },
    {
        href: '/conversations',
        name: 'Conversations',
        description: 'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
        icon: 'icons-chat-bubble',
        pattern: {
            y: -6,
            squares: [
                [-1, 2],
                [1, 3],
            ],
        },
    },
    {
        href: '/messages',
        name: 'Messages',
        description: 'Learn about the message model and how to create, retrieve, update, delete, and list messages.',
        icon: 'icons-envelope',
        pattern: {
            y: 32,
            squares: [
                [0, 2],
                [1, 4],
            ],
        },
    },
    {
        href: '/groups',
        name: 'Groups',
        description: 'Learn about the group model and how to create, retrieve, update, delete, and list groups.',
        icon: 'icons-users',
        pattern: {
            y: 22,
            squares: [[0, 1]],
        },
    },
]);
</script>

