const isInternal = new RegExp(location.host)
const isMailto = /^mailto:.*/

Array.from(document.getElementsByTagName('a')).filter(link => {
    return ! isInternal.test(link.href) && ! isMailto.test(link.href)
}).forEach(link => {
    link.target = '_blank'
    link.rel = 'noopener'
})