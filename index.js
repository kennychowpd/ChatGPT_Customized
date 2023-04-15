const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const { API } = require("./api_key.js");
const bodyParser = require("body-parser");
const cors = require("cors");


const configuration = new Configuration({
  organization: "org-M3eUEPwCGbK81QHTqz8DsE9G",
  apiKey: API,
});
const openai = new OpenAIApi(configuration);

// CREATE A SIMPLE EXPRESS API that calls the function above
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
	const { message, currentModel} = req.body;
	const response = await openai.createCompletion({
		model: `${currentModel}`,
		prompt: `${message}`,
		max_tokens: 100,
		temperature: 0.5,
	});
	res.json({
		message: response.data.choices[0].text,
	});
});

app.get("/models", async (req, res) => {
	const response = await openai.listEngines();
	console.log(response.data.data);
	res.json({
		models: response.data.data,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
