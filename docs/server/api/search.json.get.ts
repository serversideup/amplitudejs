import { serverQueryContent } from '#content/server'

export default eventHandler((event) => {
  return serverQueryContent(event).where({ _type: 'markdown', navigation: { $ne: false } }).find()
})