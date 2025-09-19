<template>
  <div>
    <ImageComponent
      :src="refinedSrc"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      class="cursor-zoom-in transition-all duration-150"
      @click.stop="zoomImage"
      ref="imgRef"
    />
    <transition name="zoom-fade">
      <div
        v-if="isZoomedIn"
        class="fixed inset-0 z-[999999999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="zoomImageOut"
      >
        <img
          :src="refinedSrc"
          :alt="props.alt"
          :style="zoomedImgStyle"
          class="zoomed-img shadow-2xl"
          @click.stop
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed, ref, onMounted, onBeforeUnmount, nextTick } from '#imports'
import ImageComponent from '#build/mdc-image-component.mjs'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined }
})


const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})

const isZoomedIn = ref(false)
const imgRef = ref<HTMLElement | null>(null)
const zoomedImgStyle = ref({})


const updateZoomedImgStyle = () => {
  // Get natural size
  const img = imgRef.value as HTMLImageElement | null
  if (!img) return
  const naturalWidth = img.naturalWidth || img.width
  const naturalHeight = img.naturalHeight || img.height
  const vw = window.innerWidth * 0.9
  const vh = window.innerHeight * 0.9
  let scale = 1
  if (naturalWidth > vw || naturalHeight > vh) {
    scale = Math.min(vw / naturalWidth, vh / naturalHeight)
  }
  zoomedImgStyle.value = {
    width: `${naturalWidth * scale}px`,
    height: `${naturalHeight * scale}px`,
    'max-width': '90vw',
    'max-height': '90vh',
    'object-fit': 'contain',
    'border-radius': '1rem',
    'background': '#18181b',
    'transition': 'transform 0.45s cubic-bezier(.23,1.12,.67,1.01), box-shadow 0.3s, opacity 0.3s',
    'transform': 'scale(1)',
    'box-shadow': '0 8px 40px 0 rgba(0,0,0,0.45)'
  }
}

const zoomImage = async () => {
  isZoomedIn.value = true
  await nextTick()
  updateZoomedImgStyle()
  document.addEventListener('keydown', onKeyDown)
}

const zoomImageOut = () => {
  isZoomedIn.value = false
  document.removeEventListener('keydown', onKeyDown)
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') zoomImageOut()
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.zoom-fade-enter-active, .zoom-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(.23,1.12,.67,1.01);
}
.zoom-fade-enter-from, .zoom-fade-leave-to {
  opacity: 0;
}
.zoomed-img {
  transition: transform 0.45s cubic-bezier(.23,1.12,.67,1.01), box-shadow 0.3s, opacity 0.3s;
  transform: scale(1);
  cursor: zoom-out;
  border-radius: 1rem;
  background: #18181b;
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  box-shadow: 0 8px 40px 0 rgba(0,0,0,0.45);
}
</style>