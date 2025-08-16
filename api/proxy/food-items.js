import fetch from "node-fetch";
import multiparty from "multiparty";
import FormData from "form-data";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Failed to parse form" });

    try {
      const formData = new FormData();

      // append fields
      for (const key in fields) {
        formData.append(key, fields[key][0]); // multiparty returns arrays
      }

      // append image if exists
      if (files.image) {
        const fs = require("fs");
        const file = files.image[0];
        formData.append("image", fs.readFileSync(file.path), file.originalFilename);
      }

      const apiResponse = await fetch("https://nhamey-api.cheatdev.online/food-items", {
        method: "POST",
        headers: { "Authorization": req.headers.authorization || "" },
        body: formData
      });

      const data = await apiResponse.json();
      res.status(apiResponse.status).json(data);

    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Proxy error" });
    }
  });
}
