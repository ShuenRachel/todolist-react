import axios from 'axios';

const baseUrl = 'https://todo-list.alphacamp.io/api/auth';

export async function login(payload) {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, { ...payload });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (e) {
    console.error('[Login failed]:', e);
  }
}

export async function signup(payload) {
  try {
    const { data } = await axios.post(`${baseUrl}/register`, { ...payload });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (e) {
    console.error('[Register failed]:', e);
  }
}

export async function checkPermission(payload) {
  try {
    const { data } = await axios.get(`${baseUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + payload,
      },
    });

    return data.success;
  } catch (e) {
    console.error('[Test token failed]:', e);
  }
}
