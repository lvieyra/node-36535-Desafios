
process.on('message', (loop)=>{
    const result = random(loop)
    process.send(result)
});

function random(loop) {
    const max = 1000;
    const arrayRandom = Array(max + 1).fill(0)

    for (let i = 0; i < loop; i++) {
        const index = Math.floor(Math.random() * max) + 1;

        arrayRandom[index] +=1;
    };

    // objeto vacío
let object = {};
delete arrayRandom[0];
arrayRandom.forEach((par,indice) => {
    object[indice] = par;

});
   return object;
}