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
  } catch (e) {
    console.error('[Get Todos failed]:', e);
  }
}
export async function deleteTodo() {
  try {
  } catch (e) {
    console.error('[Get Todos failed]:', e);
  }
}
