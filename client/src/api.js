import { apiUrl } from './config';
import axios from 'axios';
import { getUserInfo } from './localStorage';
import { showMessage } from './utils';

export const getProduct = async (id) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `http://localhost:5000/api/products/one/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    // if (response.statusText !== "OK") {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    let data = {
      email,
      password,
    };

    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    if (response.statusText != 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/register`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
    });

    if (response.statusText != 'OK') {
      throw new Error(response.data.message);
    }
    console.log(response.data);
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const update = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
      },
    });

    if (response.statusText != 'OK') {
      throw new Error(response.data.message);
    }
    //console.log(response);
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const getOrder = async (id) => {
  try {
    const { token } = getUserInfo();

    const response = await axios({
      url: `${apiUrl}/api/orders/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response);

    if (response.statusText !== 'OK') {
      throw new Error(response.message.data);
    }
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();

    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });

    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const getMyOrders = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/mine`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
    //console.log({ response });
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};
