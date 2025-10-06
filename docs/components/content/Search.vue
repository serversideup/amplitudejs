<template>
    <TransitionRoot 
        :show="show" 
        as="template" 
        @after-leave="query = ''" 
        appear>
        <Dialog as="div" class="relative z-[9999999999]" @close="show = false">
            <TransitionChild as="template" 
                enter="ease-out duration-300" 
                enter-from="opacity-0" 
                enter-to="opacity-100" 
                leave="ease-in duration-200" 
                leave-from="opacity-100" 
                leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </TransitionChild>
  
            <div class="fixed inset-0 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                <TransitionChild 
                    as="template" 
                    enter="ease-out duration-300" 
                    enter-from="opacity-0 scale-95" 
                    enter-to="opacity-100 scale-100" 
                    leave="ease-in duration-200" 
                    leave-from="opacity-100 scale-100" 
                    leave-to="opacity-0 scale-95">
                    <DialogPanel class="mx-auto max-w-3xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-xl bg-black shadow-2xl transition-all">
                        <Combobox @update:modelValue="onSelect">
                            <div class="relative">
                                <MagnifyingGlassIcon class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-500" aria-hidden="true" />
                                <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white outline-none  sm:text-sm" placeholder="Search..." @input="search()" @change="query = $event.target.value" />
                            </div>
                            
                            <ComboboxOptions static class="h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto">
                                <ComboboxOptions v-if="query === '' || results.length > 0" static class="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto">
                                    <li class="p-2" v-if="query !== ''">
                                        <h2 class="mb-2 mt-4 px-3 text-xs font-semibold text-gray-200">Results</h2>
                                        <ul class="text-sm text-gray-400">
                                            <ComboboxOption v-for="link in results" :key="link.id" :value="link" as="template" v-slot="{ active }">
                                                <li :class="['flex cursor-default select-none items-center rounded-md px-3 py-2', active && 'bg-gray-800 text-white']">
                                                    <NuxtLink :to="link.id" class="flex-auto flex items-center truncate text-sm">
                                                        <DocumentTextIcon :class="['h-5 w-5 flex-none mr-1', active ? 'text-white' : 'text-gray-500']" aria-hidden="true" />
                                                        <span class="w-[calc(100%-50px)] truncate" v-html="buildSearchResultTitle(link)"></span>
                                                    </NuxtLink>
                                                    
                                                    <span v-if="active" class="ml-3 flex-none text-gray-400">Jump to...</span>
                                                </li>
                                            </ComboboxOption>
                                        </ul>
                                    </li>
                                    <li v-if="query === ''" class="p-2">
                                        <div v-for="group in links" class="border-b border-gray-500 pb-2">
                                            <h2 class="mb-2 mt-4 px-3 text-xs font-semibold text-gray-200">{{ group.title }}</h2>
                                            <ul class="text-sm text-gray-400">
                                                <ComboboxOption v-for="link in group.links" :key="link.id" :value="link" as="template" v-slot="{ active }">
                                                    <li :class="['flex cursor-pointer select-none items-center rounded-md px-3 py-2', active && 'bg-gray-800 text-white']">
                                                        <component :is="link.icon" :class="['h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-500']" aria-hidden="true" />
                                                        <span class="ml-3 flex-auto truncate">{{ link.name }}</span>
                                                    </li>
                                                </ComboboxOption>
                                            </ul>
                                        </div>
                                        
                                    </li>
                                </ComboboxOptions>

                                <li class="px-6 py-14 text-center sm:px-14" v-if="query !== '' && results.length === 0 && !searching">
                                    <FolderIcon class="mx-auto h-6 w-6 text-gray-500" aria-hidden="true" />
                                    <p class="mt-4 text-sm text-gray-200">We couldn't find any results with that term. Please try again.</p>
                                </li>
                            </ComboboxOptions>
                        </Combobox>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { 
    MagnifyingGlassIcon 
} from '@heroicons/vue/20/solid'

import { 
    DocumentTextIcon,
    FolderIcon, 
    FolderPlusIcon, 
    HashtagIcon, 
    TagIcon 
} from '@heroicons/vue/24/outline'

import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

import DiscordIcon from './DiscordIcon.vue';
import DocsIcon from './DocsIcon.vue';
import HeartIcon from './HeartIcon.vue';
import GitHubIcon from './GitHubIcon.vue';
import MusicIcon from './MusicIcon.vue';

/**
 * CMD + K shortcut for activating the modal
 */
const show = ref(false);
const { meta, k } = useMagicKeys();

watchEffect(() => {
    if (meta.value && k.value) {
        show.value = true;
    }
});

/**
 * Event handler for opening the modal
 */
const docsEventBus = useEventBus('amplitudejs-docs-event-bus');
const listener = ( event ) => {
    if( event == 'prompt-search' ) {
        show.value = true;
    }
}
docsEventBus.on(listener);

/**
 * Default links
 */
 const defaultLinks = [
    { name: 'Docs', id: '/docs', icon: DocsIcon },
    { name: 'Examples', id: '/examples', icon: MusicIcon },
    { name: 'Discord', id: 'https://serversideup.net/discord', icon: DiscordIcon, external: true },
    { name: 'GitHub', id: 'https://github.com/serversideup', icon: GitHubIcon, external: true },
    { name: 'Sponsor', id: 'https://github.com/sponsors/serversideup', icon: HeartIcon, external: true },
]

const { data: navigation } = await useAsyncData('search-navigation', () => {
    return queryCollectionNavigation('docs', ["group"])
})

const links = computed(() => {
    let computedLinks = [];

    computedLinks.push({
        'title': 'Links',
        'links': defaultLinks
    });

    computedLinks.push({
        'title': navigation.value[0].title,
        'links': [{
            name: navigation.value[0].title,
            id: navigation.value[0].path,
            icon: DocumentTextIcon
        }]
    });


    navigation.value[0].children.forEach((link) => {
        if( link.children ){
            let childLinks = [];

            link.children.forEach((link) => {
                childLinks.push({
                    name: link.title,
                    id: link.path,
                    icon: DocumentTextIcon
                });
            });

            computedLinks.push({
                'title': link.title,
                'links': childLinks
            });
        }
    });

    return computedLinks;
})

/**
 * Performs the actual search
 */
const query = ref('')
const results = ref([])
const searching = ref(false)

const search = async () => {
    searching.value = true
    
    results.value = []

    for( let i = 0; i < links.value.length; i++ ){
        if( links.value[i].title.toLowerCase().includes(query.value.toLowerCase()) && links.value[i].id ){
            let linkObject = {
                external: false,
                title: links.value[i].title,
                id: links.value[i].id,
                icon: links.value[i].icon
            }
            results.value.push(linkObject)
        }

        for( let j = 0; j < links.value[i].links.length; j++ ){
            if( links.value[i].links[j].name.toLowerCase().includes(query.value.toLowerCase()) && links.value[i].links[j].id ){
                let linkObject = {
                    external: false,
                    title: links.value[i].links[j].name,
                    id: links.value[i].links[j].id,
                    icon: links.value[i].links[j].icon
                }
                results.value.push(linkObject)
            }
        }
    }

    searching.value = false
}

/**
 * Builds the link text from the search result
 */
const buildSearchResultTitle = (link) => {
    return link.title;
}

const onSelect = (link) => {
    if( link.external || link.id.includes('http') ){
        window.open(link.id, '_blank');
        return;
    }else{
        navigateTo(link.id, {external: true});
    }

    show.value = false;
    query.value = '';
    results.value = [];
}
</script>