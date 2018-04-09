//Immediately-Invoked Function Expression
/** creates a lexical scope to avoid polluting a global enviroment and variable hoisting  */
(function() {
    fetch('/blocks').then((result) => {
        if (result.ok) {
            return result.json();
        }
        else {
            return Promise.reject(result.status);
        }
        }).then((result) => {
           appendBlocks(result);
        })
        .catch((err) => {
            //handles the rejected promise
            console.error(err);        
        });
    
        function appendBlocks(blocks) {
            let ul = document.getElementById('block-list')
            for (let i in blocks) {
                let list_item = document.createElement('li');
                list_item.innerHTML = blocks[i];
                ul.appendChild(list_item);
            }
            
        }
}
)();
