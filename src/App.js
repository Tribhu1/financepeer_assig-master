import React        from 'react';
import { observer } from 'mobx-react'; 
import UserStore    from './stores/UserStore';
import LoginForm    from './stores/LoginForm';
import SubmitButton from './stores/SubmitButton';
import './App.css';

 class App extends React.Component{

   async componentDidMount(){
     try{
       let res = await fetch('/isLoggedIn',{
         method: 'post',
         headers: {
           'Accept': 'application/json',
           'content-Type': 'application/json'
         }// it cheac =k that user was login or not by checking session
       });

       let result = await res.json();
       if(result && result.success){
         // success is boolean propert 
         // if user is login then data loading will be false
         UserStore.loading = false;
         UserStore.isloggedIn = true;
         UserStore.username = result.username;
       }
       else{
        UserStore.loading = false;
        UserStore.isloggedIn = false;
       }

     }
     catch(e){
      UserStore.loading = false;
      UserStore.isloggedIn = false;

     }
   }
   async doLogout(){
    try{
      let res = await fetch('/logout',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        }// it cheac =k that user was login or not by checking session
      });

      let result = await res.json();
      if(result && result.success){
        // success is boolean propert 
        // if user is login then data loading will be false
        UserStore.isloggedIn = false;
        UserStore.username = '';
      }
  
    }
    catch(e){
    console.log(e);
    }
  }


  render() {

    if(UserStore.loading){
      return(
        <div className="App">
          <div className="conatiner">
              Loading, Please wait...
          </div>
        </div>  
      );
    }
    else{

      if(UserStore.isloggedIn){
         return(
        <div className="App">
          <div className="conatiner">
              Welcome {UserStore.username}

              <SubmitButton
               text={'log out'}
               disable={false}
               onClick={ () => this.doLogout()}

              />
          </div>
        </div>  
      );
      }

      
    }




  return (
    <div className="App">
      <div className="container">
      
        <LoginForm />
      </div>
     
    </div>
  );
}

}

export default observer(App);
