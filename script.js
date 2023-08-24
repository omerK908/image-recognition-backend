const fs = require('fs');

fs.readFile('./hello.txt', (err, data) => {
    if(err) {
        console.log('errrrrrrrrooooorrrrrrr');
    }
    console.log('Async', data.toString('utf8'));
});

const file = fs.readFileSync('./hello.txt');
console.log('Sync', file.toString());

//APPEND
// fs.appendFile('./hello.txt', ' helloooo', err => {
//     if(err){
//         console.log(err);
//     }
// });

//WRITE
fs.writeFileSync('bye.txt', 'Sad to see you go2', err => {
    if (err) {
        console.log(err);
    }
    
});

// setTimeout(() => {
//     fs.unlinkSync('./bye.txt', err => {
//         if (err) {
//             console.log(err);
//         }
//     });
// }, 3500);

//DELETE
fs.unlinkSync('./bye.txt', err => {
    if (err) {
        console.log(err);
    }
});