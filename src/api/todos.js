import axios from 'axios';

const baseUrl = 'https://todo-list.alphacamp.io/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    console.error(error);
    // return Promise.reject(error);
  },
);

export async function getTodos() {
  return axiosInstance.get(`${baseUrl}/todos`);
}

export async function createTodo(payload) {
  return await axiosInstance.post(`${baseUrl}/todos`, payload);
}

export async function patchTodo(payload) {
  try {
    const { id, title, isDone } = payload;

    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data;
  } catch (e) {
    console.error('[Patch Todos failed]:', e);
  }
}

export async function deleteTodo(id) {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (e) {
    console.error('[Get Todos failed]:', e);
  }
}
