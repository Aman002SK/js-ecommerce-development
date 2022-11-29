import { register, update, getMyOrders } from '../api';
import { getUserInfo, setUserInfo, clearUser } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';
// import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const ProfileScreen = {
  after_render: () => {
    document.getElementById('signout-form').addEventListener('click', () => {
      clearUser();

      document.location.hash = '/';
      toastr.success('sign out successfully');
    });
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        let data;
        try {
          data = await update({
            name: document.getElementById('name').value,
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
          toastr.success('updated successfully');
          //redirectUser();
        }
      });
  },

  render: async () => {
    try {
      var { name, email } = await getUserInfo();
      if (!name) {
        document.location.hash = '/';
      }
      var orders = await getMyOrders();
    } catch (error) {
      showMessage(error.message);
    }

    return `
<div class="profile-container">
<div class="form-container">
  <form id="register-form">
    <div class="form-items">
        <h1>User Profile</h1>

      <div class="form-control">
        <label for="name">Name</label>
        <input type="name" name="name" id="name" value="${name}" />
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="${email}" />
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <div class="form-control">
        <button type="submit" class="primary">Update</button>
      </div>

      <button type="button" id='signout-form' class="primary">SignOut</button>
    </div>
  </form>
</div>
<div class="profile-orders">
      <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${
              orders.length === 0
                ? `<tr><td colspan="6">No Order Found.</tr>`
                : orders
                    .map(
                      (order) => `
          <tr>
            <td>${order._id}</td>
            <td>${order.createdAt}</td>
            <td>${order.totalPrice}</td>
            <td>${order.paidAt || 'No'}</td>
            <td>${order.deliveryAt || 'No'}</td>
            <td><a href="/#/order/${order._id}">DETAILS</a> </td>
          </tr>
          `
                    )
                    .join('\n')
            }
          </tbody>
        </table>
      </div>
    </div>
    </div>

    `;
  },
};
export default ProfileScreen;
