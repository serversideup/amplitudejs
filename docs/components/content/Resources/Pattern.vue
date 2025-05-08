<template>
    <div class="pointer-events-none">
        <div class="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
            <GridPattern
                :width="72"
                :height="56"
                :x="'50%'"
                :y="pattern.y"
                :squares="pattern.squares"
                class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-white/1 stroke-white/2.5"/>
        </div>
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition duration-300 group-hover:opacity-100 from-[#202D2E] to-[#303428]"
            :style="{
                'mask-image': maskImage
            }"></div>
        <div class="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
            :style="{
                'mask-image': maskImage
            }">
                <GridPattern
                    :width="72"
                    :height="56"
                    :x="'50%'"
                    :y="pattern.y"
                    :squares="pattern.squares"
                    class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-white/2.5 stroke-white/10"/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['mouseX', 'mouseY', 'pattern']);

const maskImage = computed(() => {
    return 'radial-gradient(180px at '+props.mouseX+'px '+props.mouseY+'px, white, transparent)';
})
</script>