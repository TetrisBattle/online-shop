import PhoneGateway from './features/phone/PhoneGateway'

export default class Gateway {
	baseApiUrl = 'http://localhost:5000/api'
	phone = new PhoneGateway(this.baseApiUrl)
}
