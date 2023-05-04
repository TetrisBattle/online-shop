import AppStore from './AppStore'
import PhoneStore from 'features/phone/PhoneStore'

export default class RootStore {
	appStore = new AppStore()
	phoneStore = new PhoneStore()
}
