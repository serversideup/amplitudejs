<template>
    <div @mousemove="onMouseMove($event)" 
        class="group relative flex rounded-2xl transition-shadow hover:shadow-md bg-white/2.5 hover:shadow-black/5">
        <Pattern
            :mouse-x="mouseX"
            :mouse-y="mouseY"
            :pattern="resource.pattern"/>

            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20" ></div>

            <div class="relative rounded-2xl px-4 pt-16 pb-4">
                <ResourceIcon :icon="resource.icon"/>
            
                <h3 class="mt-4 text-sm font-semibold leading-7 text-white">
                    <NuxtLink :to="resource.href">
                        <span class="absolute inset-0 rounded-2xl" />
                        {{ resource.name }}
                    </NuxtLink>
                </h3>
                <p class="mt-1 text-sm text-zinc-400">
                    {{ resource.description }}
                </p>
            </div>
    </div>
</template>

<script setup>
const props = defineProps(['resource']);

const mouseX = ref(0);
const mouseY = ref(0);

const onMouseMove = ( event ) => {
    let { left, top } = event.target.getBoundingClientRect();
    mouseX.value = event.clientX - left;
    mouseY.value = event.clientY - top;
}
</script>