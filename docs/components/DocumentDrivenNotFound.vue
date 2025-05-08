<template>
    <div class="w-full min-h-screen bg-black"></div>
</template>

<script setup>
const route = useRoute();

let redirectPath = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path;

switch( redirectPath ){
    case '/docs/getting-started':
        navigateTo( redirectPath+'/these-images-vs-others', { replace: true } );
    break;
    case '/docs/guide':
        navigateTo( redirectPath+'/choosing-the-right-image', { replace: true } );
    break;
    case '/docs/reference':
        navigateTo( redirectPath+'/environment-variable-specification', { replace: true } );
    break;
    case '/docs/laravel':
        navigateTo( redirectPath+'/laravel-autorun-script', { replace: true } );
    break;
    case '/docs/wordpress':
        navigateTo( redirectPath+'/wordpress-optimizations', { replace: true } );
    break;
    case '/docs/reference':
        navigateTo( redirectPath+'/environment-variable-specification', { replace: true } );
    break;
}
</script>