const newsletterForm = document.querySelector('[data-newsletter-form]')
const newsletterSuccess = document.querySelector('[data-newsletter-success]')
const emailField = document.querySelector('[data-email-field]')

if (newsletterForm && emailField && newsletterSuccess) {

    try {
        if(localStorage.getItem('subscribedToNewsletter') == 'true') {
            newsletterForm.style.display = 'none'
            newsletterSuccess.style.display = null
        }
    } catch (err) {}

    newsletterForm.addEventListener('submit', e => {
        e.preventDefault()

        window.axios.post('https://newsletter.m1guelpf.me/subscribe-ajax.php', {
            email: emailField.value,
        }).then(response => {
            if (response.data == 1) {
                newsletterForm.style.display = 'none'
                newsletterSuccess.style.display = null

                try {
                    localStorage.setItem('subscribedToNewsletter', true);
                } catch (err) {}
            } else {
                alert('Something went wrong. Please try again or DM @m1guelpf on Twitter :)')
            }
        }).catch(() => {
            alert('Something went wrong. Please try again or DM @m1guelpf on Twitter :)')
        })
    })
}
