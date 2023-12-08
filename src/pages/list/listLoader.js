async function listLoader() {
  return JSON.parse(localStorage.getItem("characters")) || [];
}

export default listLoader;
