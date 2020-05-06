import axios from 'axios'

window.newsletter = () => ({
	subscribed: false,
	email: null,
	init() {
		this.subscribed = localStorage.getItem('subscribedToNewsletter') == 'true'
	},
	submitForm() {
		axios.post('https://newsletter.m1guelpf.me/api/subscribe/8d2265d5-111d-41b2-b170-11d4aff0dca7', {
			email: this.email,
		}).then(() => {
			this.subscribed = true

			fathom('trackGoal', 'Z8TWLFZX', 0);

			this.persistSubscription()
		}).catch(error => {
			alert(error.response.data.message)
		})
	},
	persistSubscription() {
		localStorage.setItem('subscribedToNewsletter', true);
	}
})
