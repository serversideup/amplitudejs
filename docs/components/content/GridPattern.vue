<template>
    <svg aria-hidden="true">
        <defs>
            <pattern
                :id="patternId"
                :width="width"
                :height="height"
                patternUnits="userSpaceOnUse"
                :x="x"
                :y="y">
                <path :d="`M.5 ${height}V.5H${width}`" fill="none" />
            </pattern>
            <rect
                width="100%"
                height="100%"
                stroke-width="0"
                :fill="`url(#${patternId})`"/>
            
           <svg v-for="square in squares"
                :key="patternId+'-square-'+square"
                :x="x"
                :y="y"
                class="overflow-visible">
                    <rect
                        stroke-width="0"
                        :key="`${square[0]}-${square[1]}`"
                        :width="width + 1"
                        :height="height + 1"
                        :x="square[0] * width"
                        :y="square[1] * height"/>
            </svg>
      </defs>
    </svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'x', 'y', 'squares']);
const patternId = ref(Math.floor(Math.random() * 100));
</script>
