var Person = require('./index');

var ben = new Person('Ben Franklin');

ben.on('speak', function(said) {
    
    console.log(`${this.name} said: ${said}`);
});
ben.emit('speak', 'You may dealay, but time will not');


