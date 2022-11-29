import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';
// import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        let data;
        try {
          data = await register({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
          });
          console.log(data);
        } catch (error) {
          showMessage(error.message);
        }

        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          alert('successfully registered');

          toastr.success('logged in successfully');
          document.location.hash = '/home';
          //redirectUser();
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
<form id="register-form">
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

    <button class="form-submit primary" type="submit" >SignUp</button>
  
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
