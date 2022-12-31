export default class APIManager {
  async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async post(url, data) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}
