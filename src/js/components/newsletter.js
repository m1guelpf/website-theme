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

        axios.post('https://newsletter.m1guelpf.me/api/subscribe/8d2265d5-111d-41b2-b170-11d4aff0dca7', {
            email: emailField.value,
        }).then(response => {
            if (response.data.success) {
                newsletterForm.style.display = 'none'
                newsletterSuccess.style.display = null
                
                fathom('trackGoal', 'Z8TWLFZX', 0);

                try {
                    localStorage.setItem('subscribedToNewsletter', true);
                } catch (err) {}
            } else {
                alert(response.data.message)
            }
        }).catch(() => {
            alert('Something went wrong. Please try again or DM @m1guelpf on Twitter :)')
        })
    })
}
