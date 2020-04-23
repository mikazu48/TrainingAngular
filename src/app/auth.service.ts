export class AuthService{
    loggedIn=false;

    isAuthenticated() {
        return new Promise(
            (resolve,reject) => {
                // setTimeout(() => {
                //     resolve(this.loggedIn);
                // }, 800);
                resolve(this.loggedIn);
            }
        );
    }

    login(){
        this.loggedIn = true;
        localStorage.setItem('loginStatus','true');
    }
    logout(){
        this.loggedIn = false;
        localStorage.setItem('loginStatus','false');
    }
    
}