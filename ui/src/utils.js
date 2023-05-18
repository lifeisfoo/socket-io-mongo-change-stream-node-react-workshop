export async function postMessage(data) {
  const response = await fetch("/messages", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getMessages() {
  const response = await fetch("/messages");
  return response.json();
}
