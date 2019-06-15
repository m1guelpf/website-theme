

(function () {
    window.__onThemeChange = function () {};

    function setTheme(newTheme) {
        window.__theme = newTheme;
        preferredTheme = newTheme;

        newTheme == 'dark' ? document.body.setAttribute('data-dark', true) : document.body.removeAttribute('data-dark')

        window.__onThemeChange(newTheme);
    }

    var preferredTheme;

    try {
        preferredTheme = localStorage.getItem('theme');
    } catch (err) {}

    window.__setPreferredTheme = function (newTheme) {
        setTheme(newTheme);

        try {
            localStorage.setItem('theme', newTheme);
        } catch (err) {}
    }

    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.addListener(function (e) {
        window.__setPreferredTheme(e.matches ? 'dark' : 'light')
    });

    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
})();

document.getElementById('themeToggle').onclick = () => {
    window.__setPreferredTheme(
        window.__theme == 'light' ? 'dark' : 'light'
    )
}
