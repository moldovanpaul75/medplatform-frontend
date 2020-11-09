class AuthenticationService {

    isUserLoggedIn() {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        console.log("authenticated: " + username);

        if (token) {
            return true;
        }
        return false;
    }

    registerLogin(username, token, role){
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
    }


    getUserRole(){
        const role = localStorage.getItem('role')
        console.log(role)
        return role
    }


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    }

}


export default new AuthenticationService()