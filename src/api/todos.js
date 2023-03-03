import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export async function getTodos() {
  return axios.get(`${baseUrl}/todos`);
  //   try {
  //     const res = await axios.get(`${baseUrl}/todos`);
  //     return res.data;
  //   } catch (e) {
  //     console.error('[Get Todos failed]:', e);
  //   }
}
export async function createTodo(payload) {
  try {
    const { title, isDone } = payload;
    const res = await axios.post(`${baseUrl}/todos`, { title, isDone });
    return res.data;
  } catch (e) {
    console.error('[Get Todos failed]:', e);
  }
}
export async function patchTodo() {
  try {
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
