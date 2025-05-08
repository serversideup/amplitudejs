<template>
    <TabGroup @change="changeTab" :selectedIndex="selectedTabIndex" as="div" class="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md ring-1 ring-white/10">
        <div ref="positionRef" class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b px-4 border-zinc-800 bg-transparent">
            <h3 v-if="title != ''" class="mr-auto pt-3 text-xs font-semibold text-white">
                {{ title }}
            </h3>
            <TabList class="-mb-px flex gap-4 text-xs font-medium">
                <Tab v-for="tab in tabs"
                    :key="'tab-'+tab.key"
                    class="border-b py-3 transition focus-visible:outline-none focus:[&:not(:focus-visible)]:outline-none"
                    :class="{
                        'border-emerald-500 text-emerald-400': selectedTab == tab.key,
                        'border-transparent text-zinc-400 hover:text-zinc-300': selectedTab != tab.key
                    }">
                        {{ tab.name }}
                </Tab>
            </TabList>
        </div>
        <TabPanels>
            <TabPanel as="div" v-for="tab in tabs" :key="'tab-'+tab">
                <div class="group bg-white/2.5">
                    <PanelHeader
                        :tag="tag"
                        :label="label"/>

                    <div class="relative overflow-x-auto p-4 text-xs text-white">
                        <ContentSlot :use="$slots[tab.key]"/>
                        <CopyButton :code="$slots[tab.key]()[0].props.code"/>
                    </div>
                </div>
            </TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<script setup>
import { 
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel
} from '@headlessui/vue'

const props = defineProps({
    title: {
        default: ''
    },
    tabs: {
        default(){
            return [];
        }
    },
    label: {
        default: ''
    },
    snippets: {
        default(){
            return [];
        }
    },
    tag: {
        return: ''
    },
    label: {
        return: ''
    }
})

const preferredProgrammingLanguage = usePreferredProgrammingLanguage();

const selectedTab = computed(() => {
    if( preferredProgrammingLanguage.value == '' ){
        if( props.tabs.length > 0 ){
            return props.tabs[0].key;
        }else{
            return '';
        }
    }else{
        return preferredProgrammingLanguage.value;
    }
})

const selectedTabIndex = computed(() => {
    for( let i = 0; i < props.tabs.length; i++ ){
        if( props.tabs[ i ].key == preferredProgrammingLanguage.value ){
            return i;
        }
    }

    return 0;
});

const positionRef = ref(null);
function changeTab( index ){
    let initialTop = positionRef.value.getBoundingClientRect().top

    preferredProgrammingLanguage.value = props.tabs[index].key;

    window.requestAnimationFrame(() => {
        let newTop = positionRef.value.getBoundingClientRect().top
        window.scrollBy(0, newTop - initialTop)
      })
}
</script>