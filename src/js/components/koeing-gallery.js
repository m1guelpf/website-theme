var images = document.querySelectorAll('.kg-gallery-image img');

images.forEach(image => {
    var container = image.closest('.kg-gallery-image');

    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;

    container.style.flex = ratio + ' 1 0%';
})

if (document.querySelector('.post-template')) {
    window.addEventListener('load', () => {
        import('medium-zoom').then(mediumZoom => {
            mediumZoom.default('article img:not(.no-zoomable)', {
                margin: 24,
                background: 'var(--sepia-500)'
            });
        })
    }, false);
}