export default defineNuxtRouteMiddleware(( to, from ) => {
    let redirectPath = to.path.endsWith('/') ? to.path.slice(0, -1) : to.path;

    switch( redirectPath ){
        case '/docs/getting-started':
            return navigateTo( redirectPath+'/these-images-vs-others', { replace: true } );
        break;
        case '/docs/guide':
            return navigateTo( redirectPath+'/choosing-the-right-image', { replace: true } );
        break;
        case '/docs/reference':
            return navigateTo( redirectPath+'/environment-variable-specification', { replace: true } );
        break;
    }
})