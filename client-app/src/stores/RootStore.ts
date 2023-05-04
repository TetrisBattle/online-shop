import AppStore from './AppStore'
import PhoneStore from '../components/features/phone/PhoneStore'

export default class RootStore {
	appStore = new AppStore()
	phoneStore = new PhoneStore()
}
