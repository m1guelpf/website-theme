import axios from 'axios'

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
    
        axios.post('https://app.mailerlite.com/webforms/submit/d4j8l4?ml-submit=1&ajax=1&guid=baa9f0fc-f6ab-3081-475a-3dca456bfbdf&fields[email]=' + emailField.value).then(response => {
            if (response.data.success) {
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
