const toggleFeatured = document.querySelector('[data-toggle-featured]')
const toggleSimplified = document.querySelector('[data-toggle-simplified-view]')
const articleElements = Array.from(document.querySelectorAll('[data-article-listing]'))
const featuredArticles = Array.from(document.querySelectorAll('[data-article-listing][data-featured]'))
const notFeaturedArticles = Array.from(document.querySelectorAll('[data-article-listing][data-not-featured]'))

if (toggleFeatured && featuredArticles && notFeaturedArticles) {
    toggleFeatured.addEventListener('click', () => {
        const shouldDisable = notFeaturedArticles[0].style.display == 'none';

        if (shouldDisable) {
            articleElements.forEach(article => {
                article.style.display = null
            })
        } else {
            notFeaturedArticles.forEach(article => {
                article.style.display = 'none'
            })
        }
    })
}

if (toggleSimplified && articleElements) {
    const articles = articleElements.map(article => {
        return {
            root: article,
            excerpt: article.querySelector('[data-post-excerpt]'),
            meta: article.querySelector('[data-post-meta]'),
        }
    })

    toggleSimplified.addEventListener('click', () => {
        const shouldDisable = articles[0].meta.style.display == 'none'

        if (shouldDisable) {
            articles.forEach(article => {
                article.excerpt.style.display = article.meta .style.display = null
            })
        } else {
            articles.forEach(article => {
                article.excerpt.style.display = article.meta .style.display = 'none'
            })
        }
    })
}