# JetMLGPT

JetMLGPT is a Jupyter extension that brings the power of OpenAI's ChatGPT and GPT4 to your Jupyter notebooks. It helps you with auto-completing, commenting, and debugging code within your Jupyter notebook environment.

## Features

* Auto-complete code in Jupyter notebooks using ChatGPT and GPT4
* Generate minimal comments for the provided code
* Debug and fix errors in your code

## Installation

To install the JetMLGPT extension, simply run the following command and restart jupyter:

```
pip install jetmlgpt
jupyter serverextension enable --py jetmlgpt
```

## Usage

Before using JetMLGPT, you'll need to sign up for an OpenAI API key. To do so, please visit [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) and follow the instructions to create an account and obtain your API key.

Please note that to use the GPT-4 model with JetMLGPT, you may need to request beta access from OpenAI. To join the waitlist for the GPT-4 API, visit [https://openai.com/waitlist/gpt-4-api](https://openai.com/waitlist/gpt-4-api) and sign up. Once you've been granted access, you'll be able to select and use the GPT-4 model within the JetMLGPT extension.

Next, set your OpenAI API key in the environment variable `OPENAI_API_KEY` to activate the extension.

### Running on JetML platform

JetML platform has the JetMLGPT extension preinstalled. When setting up your workflow on the JetML platform, include the `OPENAI_API_KEY` as an environment variable. This will enable the extension in your Jupyter notebook instances.

### Running locally with Docker

To run Jupyter notebook with the JetMLGPT extension locally using Docker, execute the following command:

```
docker run -p 8888:8888 -it -e 'OPENAI_API_KEY=api_key_value' -e 'TOKEN=123' -v /local/folder:/notebooks/ jetml/images:jupyter
```

Replace `api_key_value` with your OpenAI API key and `/local/folder` with your desired local folder for mounting notebooks.

Then, launch your Jupyter notebook, and you'll find the following buttons:

1. "Run Jupyter Chat": Use this button to auto-complete the code in the selected cell.
![JetMLGPT Generate Code Demo](assets/jetmlgpt-generate-code.gif)
2. "Add Comment": Use this button to generate a minimal comment for the provided code.
![JetMLGPT Generate Code Demo](assets/jetmlgpt-comments.gif)
3. "Fix Error": Use this button to debug and fix errors in your code, based on the input and output of the selected cell.
![JetMLGPT Generate Code Demo](assets/jetmlgpt-debug.gif)

You can also choose between the GPT-3.5 Turbo and GPT-4 models using the dropdown menu.

## Documentation

For more information about JetMLGPT, please visit our website at [https://jetml.com](https://jetml.com) (hosted options available)

You can also check out the source code and contribute to the project on GitHub: [https://github.com/jetml/jetmlgpt](https://github.com/jetml/jetmlgpt).

## License

JetMLGPT is licensed under the Apache Software License. For more information, please refer to the [LICENSE](LICENSE) file.

## Privacy and Data Handling

When using JetMLGPT, be cautious about sharing sensitive information, such as personally identifiable information (PII), intellectual property, trade secrets, or any other confidential material. OpenAI's API processes and stores the data sent to it. To avoid potential data breaches or misuse, do not share sensitive notebooks and data with OpenAI. For more information, consult OpenAI's [data usage policy](https://platform.openai.com/docs/data-usage-policies).