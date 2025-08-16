import fetch from "node-fetch";
import multiparty from "multiparty";
import FormData from "form-data";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const foodId = req.query.food_id;
  if (!foodId) return res.status(400).json({ error: "food_id is required" });

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Failed to parse form" });

    const formData = new FormData();

    for (const key in fields) formData.append(key, fields[key][0]);

    if (files.file) {
      const fs = require("fs");
      const file = files.file[0];
      formData.append("file", fs.readFileSync(file.path), file.originalFilename);
    }

    try {
      const apiResponse = await fetch(
        `https://nhamey-api.cheatdev.online/upload/food-image/${foodId}`,
        {
          method: "POST",
          headers: { "Authorization": req.headers.authorization || "" },
          body: formData
        }
      );

      const data = await apiResponse.json();
      res.status(apiResponse.status).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Proxy error" });
    }
  });
}