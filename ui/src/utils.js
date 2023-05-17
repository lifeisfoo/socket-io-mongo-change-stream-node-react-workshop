export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// SUPPORT fn
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
