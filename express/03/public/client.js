
//Immediately-Invoked Function Expression
/** creates a lexical scope to avoid polluting a global enviroment and variable hoisting  */
(function () {
    fetch('/blocks').then((result) => {
        if (result.ok) {
            return result.json();
        }
        else {
            return Promise.reject(result.status);
        }
    })
        .then((result) => {
            appendBlocks(result);
    })
        .catch((err) => {
            //handles the rejected promise
            console.error(err);
        });

    function appendBlocks(blocks) {
        let ul = document.getElementById('block-list');
        for (let i in blocks) {
            let list_item = document.createElement('li');
            list_item.innerHTML = blocks[i];
            ul.appendChild(list_item);
        }
    }
    let form = document.getElementById('submit');
    form.addEventListener('click', () => {
        const name = document.getElementById('blockName').value;
        const description = document.getElementById('blockDescription').value;

        const BodyObj = {
            name: name,
            description: description,
        }
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const initObj = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: JSON.stringify(BodyObj)
        }

        fetch('http:/blocks', initObj).then((result) => {
            if (result.ok) {
                return result.json();
            }
            else {
                return Promise.reject(result.status);
            }
        }).then((result) => {
            appendToList(result);
        }).catch((err) => {
            console.log(err);
        });
    });
    function appendToList(block) {
        let ul = document.getElementById('block-list');
        let li = document.createElement('li');
        li.innerHTML = block;
        ul.appendChild(li);
        document.getElementById('form').reset();
    }
}
)();
