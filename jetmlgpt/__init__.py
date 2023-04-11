def _jupyter_server_extension_paths():
    return [{
        "module": "jetmlgpt"
    }]

# Jupyter Extension points
def _jupyter_nbextension_paths():
    return [dict(
        section="notebook",
        # the path is relative to the `jetmlgpt` directory
        src="static",
        # directory in the `nbextension/` namespace
        dest="jetmlgpt",
        # _also_ in the `nbextension/` namespace
        require="jetmlgpt/index")]

#def load_jupyter_server_extension(nbapp):
#    nbapp.log.info("my module enabled!")


import os
from notebook.utils import url_path_join
from notebook.base.handlers import IPythonHandler
from tornado import web

class ApiKeyHandler(IPythonHandler):
    @web.authenticated
    def get(self):
        api_key = os.environ.get('OPENAI_API_KEY', 'API key not found')
        self.finish(api_key)

def load_jupyter_server_extension(nb_server_app):
    web_app = nb_server_app.web_app
    host_pattern = '.*$'
    route_pattern = url_path_join(web_app.settings['base_url'], '/get_api_key')
    web_app.add_handlers(host_pattern, [(route_pattern, ApiKeyHandler)])