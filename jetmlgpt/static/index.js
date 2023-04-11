define([
    'base/js/namespace',
    'base/js/events'
    ], function(Jupyter, events) {

      var model_version = "gpt-3.5-turbo"; // Default model version
      let api_key = null

      var createModelDropdown = function() {
        var modelDropdown = $('<select/>')
            .attr('id', 'model-dropdown')
            .css('margin-left', '5px')
            .css('margin-right', '5px')
            .css('width', 'auto');
        modelDropdown.append($('<option/>').attr('value', 'gpt-3.5-turbo').text('GPT-3.5 Turbo'));
        modelDropdown.append($('<option/>').attr('value', 'gpt-4').text('GPT-4'));
        modelDropdown.change(function() {
            model_version = $(this).val();
        });
        return modelDropdown;
      };
      
      var insert_cell = async function() {

        bearer_token = "Bearer " + api_key

        var content = "";
        Jupyter.notebook.get_cells().forEach(function(cell){
            content += cell.get_text() + "\n";
        });
        console.log(content);
                  
        selected_cell = Jupyter.notebook.get_selected_cell();
        input_source = JSON.parse(JSON.stringify(selected_cell)).source
 
        prompt = "current_cell:::" + input_source + " ::: jupyter_notebook_contents ::: " + content
          
        console.log({prompt})

        response = fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": bearer_token
          },
          body: JSON.stringify({
            "model": model_version,
            "messages": [{"role": "system", "content": "You are a helpful coding assistant that is an expert level data scientist, data engineer, and MLOPs engineer. I'm going to give you contents from a jupyter notebook and the current cell that is selected. Please provide just code for the next jupyter cell without any wrapper comments around the code. You will break the code into cells. Please stop your output early to end a cell. You will resume outputing the next cell the next time you are called. When you are at a good end to the code, please return ###Original command complete###"},            
                         {"role": "user", "content": prompt}],
            "temperature": 0.7
          })
        })
        .then(response => response.json())
        .then(data => {  
            console.log({data})
            Jupyter.notebook.insert_cell_below('code').set_text(data.choices[0].message.content);
        })
        .catch(error => console.error(error));          
          
          
      };

      
 /////////////////////// Comment feature
      var insert_comment = async function() {
        
        bearer_token = "Bearer " + api_key

        selected_cell = Jupyter.notebook.get_selected_cell();
        input_source = JSON.parse(JSON.stringify(selected_cell)).source
 
        prompt=input_source

        console.log({prompt})
  
        response = fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": bearer_token
          },
          body: JSON.stringify({
            "model": model_version,
            "messages": [{"role": "system", "content": "You are a human data scientist and are capable of creating minimal comments for the following code in markdown, explain only the provided code and do not add examples or make anything up, use only ### or smaller heading sizes. Make sure headings do a good job of describing the purpose of the provided code. Try to keep this comment to 40 words or less."},            
                         {"role": "user", "content": prompt}],
            "temperature": 0.7
          })
        })
        .then(response => response.json())
        .then(data => {  
            console.log({data})
            returned_text = "" + data.choices[0].message.content
            Jupyter.notebook.insert_cell_above('markdown').set_text(returned_text);
        })
        .catch(error => console.error(error));          
          
          
      };
       // Add Toolbar button
      var jupyterCommentButton = function () {
          console.log();
          Jupyter.toolbar.add_buttons_group([
              Jupyter.keyboard_manager.actions.register ({
                  'help': 'add comment',
                  'icon' : 'fa-commenting-o',
                  'handler': insert_comment
              }, 'run_jupyter_insert_comment', 'Jupyter insert_comment')
          ])
      }
 /////////////////////// Error feature
      var insert_error_comment = async function() {

        bearer_token = "Bearer " + api_key

        selected_cell = Jupyter.notebook.get_selected_cell();
        console.log(JSON.parse(JSON.stringify(selected_cell)))
        input_source = JSON.parse(JSON.stringify(selected_cell)).source
        output_source = JSON.stringify(JSON.parse(JSON.stringify(selected_cell)).outputs[0])
 
        prompt = '::: input -' + input_source + '::: output - ' + output_source 
          
        console.log({prompt})

          
        response = fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": bearer_token
          },
          body: JSON.stringify({
            "model": model_version,
            "messages": [{"role": "system", "content": "You are a programming assistant, please take this code input and output and tell me what is wrong with my code. Provide rewritten code with your suggested answer along with descriptions of the alterations and original problem in the code."},            
                         {"role": "user", "content": prompt}],
            "temperature": 0.7
          })
        })
        .then(response => response.json())
        .then(data => {  
            console.log({data})
            returned_text = "" + data.choices[0].message.content
            Jupyter.notebook.insert_cell_below('markdown').set_text(returned_text);
        })
        .catch(error => console.error(error));          
          
          
      };
    
      // Add Toolbar button
      var jupyterErrorCommentButton = function () {
          console.log();
          Jupyter.toolbar.add_buttons_group([
              Jupyter.keyboard_manager.actions.register ({
                  'help': 'fix error',
                  'icon' : 'fa-bug',
                  'handler': insert_error_comment
              }, 'run_jupyter_insert_error_comment', 'Jupyter insert_error_comment')
          ])
      }
      
    // Run on start
    async function load_ipython_extension() {
      //set api_key to global
      api_key = await get_api_key()
      console.log({api_key})
      if(api_key && api_key != 'API key not found') {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register ({
                'help': 'run Jupyter Chat',
                'icon' : 'fa-plane',
                'handler': insert_cell
            }, 'run_jupyter_chat', 'Jupyter Chat')
        ]);
        Jupyter.toolbar.element.append(createModelDropdown());
        jupyterCommentButton();
        jupyterErrorCommentButton();
      } else {
        console.log("no api key found for jetmlgpt");
      }
    }
 
    
    async function get_api_key() {
        var base_url = Jupyter.notebook.base_url;
        return new Promise((resolve, reject) => {
            $.get(base_url + 'get_api_key', function(api_key) {
                resolve(api_key);
            }).fail(function(error) {
                reject(error);
            });
        });
    }
  
    return {
        load_ipython_extension: load_ipython_extension
    };
});
