async function viewLoader({ params }) {
  const { characterIndex } = params;
  const characters = JSON.parse(localStorage.getItem("characters")) || [];

  if (!characters?.[characterIndex]) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return characters[characterIndex];
}

export default viewLoader;
