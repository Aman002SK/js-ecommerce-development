import { signin } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, redirectUser, showLoading, showMessage } from '../utils';
// import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const SigninScreen = {
  after_render: () => {
    document
      .getElementById('signin-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        let data;
        try {
          data = await signin({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
          });
        } catch (error) {
          showMessage(error.message);
        }
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/home';
          toastr.success('logged in successfully');

          //redirect user based on shopping cart
          // redirectUser();
        }
      });
  },

  render: () => {
    // if user already signin
    // if (getUserInfo().name) {
    //   redirectUser();
    // }
    return `
<div class="form-container">
  <form id="signin-form">
    <div class="form-items">
        <h1>Sign-In</h1>

      <div class="form-control">
        <label class="form-label" for="email">Email</label>
        <input class="form-input" type="email" name="email" id="email" />
      </div>

      <div class="form-control">
        <label class="form-label" for="password">Password</label>
        <input class="form-input" type="password" name="password" id="password" />
      </div>

        <button class="form-submit primary" type="submit" >Sign in</button>
      
      <div>
        <div>
          New User?
          <a href="/#/register">Create your account </a>
        </div>

      </div>
    </div>
  </form>
</div>
    `;
  },
};
export default SigninScreen;
