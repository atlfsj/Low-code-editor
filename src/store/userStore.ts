import {create} from "zustand";
import Axios from "../request/axios";
import {getUserInfo, loginEnd, logoutEnd, registerEnd} from "../request/end";
import docCookies from "../utils/cookies";
// 这一组件中还未理解 docCookies

interface UserStoreState {
    isLogin: boolean;
    name: string;
}
const initialState: UserStoreState = {isLogin: false, name: ""};

const useUserStore = create<UserStoreState>()(() => ({...initialState}));

export const fetchUserInfo = async () => {
    let user = {...initialState};
    const res = await Axios.get(getUserInfo);
    if (res) {
        user = {isLogin: true, name: res.data.name};
    }
    useUserStore.setState(() => user);
    console.log(res)
    console.log(user.isLogin)
};
export const login = async (values: {name: string, password: string})=> {
    let user = {...initialState};
    const res:any = await Axios.post(loginEnd, values);
    if(res){
        user = {isLogin: true, name: res.name};
        docCookies.setItem("sessionId", res.sessionId);
    }
    useUserStore.setState(user);
    console.log(res)
}
export const registerAndLogin = async (values: {name:string, password:string})=> {
    const res = await Axios.post(registerEnd, values)
    if(res){
        login(values);
        console.log(res);
    }
}
export const logout = async ()=> {
    let user = {...initialState};
    await Axios.post(logoutEnd);
    docCookies.removeItem("sessionId");
    useUserStore.setState(user)
}

export default useUserStore;