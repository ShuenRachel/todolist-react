import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export async function getTodos() {
  return axios.get(`${baseUrl}/todos`);
}

export async function createTodo(payload) {
  return await axios.post(`${baseUrl}/todos`, payload);
}

export async function patchTodo(payload) {
  try {
    const { id, title, isDone } = payload;

    const res = await axios.patch(`${baseUrl}/todos/${id}`, { title, isDone });

    return res.data;
  } catch (e) {
    console.error('[Patch Todos failed]:', e);
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
