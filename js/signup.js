import fetch from "node-fetch";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const formData = new FormData();
      for (const key in req.body) {
        formData.append(key, req.body[key]);
      }

      const response = await fetch("https://nhamey-api.cheatdev.online/food-items", {
        method: "POST",
        headers: {
          "Authorization": req.headers.authorization || ""
        },
        body: formData
      });

      const data = await response.json();
      res.status(response.status).json(data);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Proxy error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}