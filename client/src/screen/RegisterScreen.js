import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage, redirectUser } from '../utils';
// import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('click', async (e) => {
      e.preventDefault()
        showLoading();
        let data;
        try {
          data = await register({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
          });
          //console.log(data);
          hideLoading();
          if (data.error) {
            console.log("Hello")
            showMessage(data.error);
          } else {
            setUserInfo(data);
            alert('successfully registered');
  
            toastr.success('logged in successfully');
            document.location.hash = '/home';
            //redirectUser();
          }
        } catch (error) {
          console.log("error")
          showMessage(error.message);
        }

        
       
      });
  },

  render: () => {
    if (getUserInfo().name) {
      redirectUser();
      //document.location.hash = '/home';
    }
    return `
<div class="form-container">
<form >
<div class="form-items">
    <h1>Register</h1>

    <div class="form-control">
    <label class="form-label" for="name">Name</label>
    <input class="form-input" type="name" name="name" id="name" />
  </div>
  <div class="form-control">
    <label class="form-label" for="email">Email</label>
    <input class="form-input" type="email" name="email" id="email" />
  </div>

  <div class="form-control">
    <label class="form-label" for="password">Password</label>
    <input class="form-input" type="password" name="password" id="password" />
  </div>

    <button id="register-form" class="form-submit primary" type="submit" >SignUp</button>
  
  <div>
    <div>
      Already Registered?
      <a href="/#/signin">Login to Account </a>
    </div>

  </div>
  </form>
</div>
    `;
  },
};
export default RegisterScreen;
