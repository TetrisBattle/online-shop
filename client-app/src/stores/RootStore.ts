import Gateway from 'Gateway'
import AppStore from './AppStore'
import PhoneStore from 'features/phone/PhoneStore'

export default class RootStore {
	gateway = new Gateway()
	appStore = new AppStore()
	phoneStore = new PhoneStore(this.gateway)
}
