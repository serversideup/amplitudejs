import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'
export default defineEventHandler(async (event) => {
    // Fetch all documents
    const docs = await serverQueryContent(event).find()
    const sitemap = new SitemapStream({
        hostname: 'https://serversideup.net'
    })    

    for (const doc of docs) {
        sitemap.write({
            url: '/open-source/amplitudejs'+doc._path,
            changefreq: 'monthly'
        })
    }

    sitemap.end()
    return streamToPromise(sitemap)
})