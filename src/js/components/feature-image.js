import './../lib/svgBlob'

(() => {
    
    new SvgBlob('#blobbed', {
        speedFactor: .5,
        animateOnHover: false,
        animateWhenVisible: true,
    })

    setTimeout(() => {
        Array.from(document.querySelectorAll("article pre[class*='language-']")).forEach(el => {
            const codeEl = el.querySelector('code')

            if (codeEl.innerHTML.indexOf("\n") === codeEl.innerHTML.length - 1) {
                return;
            }

            el.classList.add('code-blob')
        })
        new SvgBlob(".code-blob", {
            speedFactor: .5,
            animateOnHover: false,
            animateWhenVisible: false,
            hideOnMobile: true,
        })
    }, 1000)

    if (document.querySelector('.tag-internal-blobify-images')) {
        Array.from(document.querySelectorAll('.kg-image-card')).forEach(el => {
            const wrapper = document.createElement('div')
            wrapper.classList.add('kg-image-blob')
            el.prepend(wrapper)
            wrapper.appendChild(el.querySelector('img'))
        })
        
        new SvgBlob('.kg-image-blob', {
            speedFactor: .5,
            animateOnHover: true,
            animateWhenVisible: false,
        })
    }
})()