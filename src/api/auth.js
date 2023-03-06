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

export async function deleteTodo(id) {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (e) {
    console.error('[Get Todos failed]:', e);
  }
}
