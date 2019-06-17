import axios from 'axios'

const newsletterForm = document.getElementById('newsletterForm')
const newsletterSuccess = document.getElementById('newsletterSuccess')
const emailField = document.getElementById('email')

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
                alert('something went wrong. Please try again or DM me on Twitter :)')
            }
        }).catch(() => {
            alert('something went wrong. Please try again or DM me on Twitter :)')
        })
    })
}
