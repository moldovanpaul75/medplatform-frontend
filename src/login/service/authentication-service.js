class AuthenticationService {

    isUserLoggedIn() {
        const token = localStorage.getItem('token')

        if (token) {
            return true;
        }
        return false;
    }

    registerLogin(username, token, role, id){
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', id);
    }


    getUserRole(){
        const role = localStorage.getItem('role');
        return role;
    }

    getUserId(){
        const id = localStorage.getItem('userId');
        return id;
    }

    createJWTToken() {
        return 'Bearer ' + localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
    }

}


export default new AuthenticationService()