import setuptools

# Read the contents of your README file
with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="jetmlgpt",
    version="0.1.3",
    author="Nick M.",
    author_email="nick@jetml.com",
    description="A Jupyter extension for auto-completing, commenting, and bebugging code in Jupyter notebooks using ChatGPT and GPT4. Set your OpenAI API key in the environment variable OPENAI_API_KEY to activate.",
    long_description=long_description,
    long_description_content_type="text/markdown",    
    url="https://github.com/yourusername/jetmlgpt",
    packages=setuptools.find_packages(),
    include_package_data=True,
    data_files=[
        # like `jupyter nbextension install --sys-prefix`
        ("share/jupyter/nbextensions/jetmlgpt", [
            "jetmlgpt/static/index.js",
        ]),
        # like `jupyter nbextension enable --sys-prefix`
        ("etc/jupyter/nbconfig/notebook.d", [
            "jupyter-config/nbconfig/notebook.d/jetmlgpt.json"
        ]),
        # like `jupyter serverextension enable --sys-prefix`
        ("etc/jupyter/jupyter_notebook_config.d", [
            "jupyter-config/jupyter_notebook_config.d/jetmlgpt.json"
        ])
    ],
    classifiers=[
        'Framework :: Jupyter',
        'License :: OSI Approved :: Apache Software License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    zip_safe=False
)