if (document.querySelector('[data-comment-count]')) {
    const paths = {}

    document.querySelectorAll('[data-comment-count]').forEach(el => {
        paths[el.getAttribute('data-comments-for')] = el
    })

    window.axios.post('https://comments.m1guelpf.me/api/comment/count', {
        domain: parent.location.host,
        paths: Object.keys(paths)
    }, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        Object.entries(response.data.commentCounts).forEach(result => {
            paths[result[0]].innerHTML = `&mdash; ${result[1] + 1} ${result[1] == 0 ? 'comment':'comments'}`
        })
    }).catch(error => {
        console.log("[commento] error: " + error.message)
    })
    })

}
