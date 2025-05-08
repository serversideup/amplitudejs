<template>
    <div class="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
        <ContentSlot :use="$slots.default"/>
    </div>
</template>