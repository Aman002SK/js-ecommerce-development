import { getCartItems } from './localStorage';

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};
// rerender method
export const rerender = async (comp) => {
  try {
    document.getElementById('main-container').innerHTML = await comp.render();
    await comp.after_render();
  } catch (error) {
    showMessage(error.message);
  }
};
export const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active');
};

export const hideLoading = () => {
  document.getElementById('loading-overlay').classList.remove('active');
};

export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div id='message-overlay-content' >${message}</div>
  <button id='message-overlay-close-button'>OK</button>`;

  document.getElementById('message-overlay').classList.add('overlay-active');

  document
    .getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
      document
        .getElementById('message-overlay')
        .classList.remove('overlay-active');
      if (callback) {
        callback();
      }
    });
};

export const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/home';
  }
};
