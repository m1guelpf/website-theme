document.getElementById('themeToggle').onclick = () => {
    document.body.toggleAttribute('data-dark');
}

Array.from(document.getElementsByTagName('a')).forEach(link => {
    link.addEventListener('transitionrun', () => {
        if (isHovered(link)) {
            link.style.transition = 'none'
        }
    });

    link.addEventListener('mouseout', () => {
        setTimeout(() => {
            link.style.transition = null
        }, 1000)
    });
})

function isHovered(el) {
    return (el.parentElement.querySelector(':hover') === el);
}