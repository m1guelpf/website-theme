import mediumZoom from 'medium-zoom'

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
        const zoomImages = [
            ...document.querySelectorAll('article .kg-image-card img:not(.no-zoomable)'),
            ...document.querySelectorAll('article .kg-gallery-image img:not(.no-zoomable)')
        ]

        mediumZoom(zoomImages, {
            margin: 24,
            background: 'var(--sepia-500)'
        });
    }, false);
}
