import AppStore from './AppStore'
import UserStore from 'features/users/UserStore'
import PhoneStore from 'features/phone/PhoneStore'

export default class RootStore {
	appStore = new AppStore()
	userStore = new UserStore()
	phoneStore = new PhoneStore()
}
