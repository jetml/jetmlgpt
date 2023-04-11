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

## Important

Do not share sensitive notebooks and data with OpenAI.
