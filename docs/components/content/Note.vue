<style>
.note-text code{
    color: rgb(250, 250, 250);
    font-family: JetBrains Mono, "JetBrains Mono Fallback: Arial";
    font-size: 0.875rem;
    background-color: rgb(33, 33, 33);
    border: solid;
    border-color: rgb(41, 41, 41);
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 4px;
}

.note-text a {
    color: #FFFFFF;
    text-decoration: underline;
    text-decoration-color: #61656C;
    text-underline-offset: 6px;
    text-decoration-thickness: 2px;
    transition: text-decoration-color 0.4s cubic-bezier(.4,0,.2,1);
    font-weight: 500;
}

.note-text a:hover {
    text-decoration-color: #fff;
}
</style>
<template>
    <div class="not-prose my-6 flex gap-2.5 rounded-2xl border p-4 leading-6 border-emerald-500/30 bg-emerald-500/5 text-emerald-200 [--tw-prose-links:theme(colors.white)] [--tw-prose-links-hover:theme(colors.emerald.300)]">
        <InfoIcon class="mt-1 h-4 w-4 flex-none fill-emerald-200/20 stroke-emerald-200" />
        <div class="[&>:first-child]:mt-0 [&>:last-child]:mb-0 note-text">
            <slot/>
        </div>
    </div>
</template>