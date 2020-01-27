if (document.body.classList.contains('post-template')) {
	const url = `https://og.m1guelpf.me${(new URL(document.location.href)).pathname}`

	document.querySelector('meta[property="og:image"]').setAttribute('content', url)
	document.querySelector('meta[name="twitter:image"]').setAttribute('content', url)
}