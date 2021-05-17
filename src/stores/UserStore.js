import { extendObservable } from 'mobx';
class UserStore{
    constructor(){
        extendObservable(this,{
            loading: true,
            isloggedIn: false,
            username: '',
        })
    }
}
export default new UserStore();