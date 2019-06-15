require('./lib/prism');

document.getElementById('themeToggle').onclick = function () {
  document.body.toggleAttribute('data-dark');
};

Array.from(document.getElementsByTagName('a')).forEach(function (link) {
  link.addEventListener('transitionrun', function () {
    if (isHovered(link)) {
      link.style.transition = 'none';
    }
  });
  link.addEventListener('mouseout', function () {
    setTimeout(function () {
      link.style.transition = null;
    }, 1000);
  });
});

function isHovered(el) {
  return el.parentElement.querySelector(':hover') === el;
}
