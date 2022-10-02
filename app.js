import pick from 'pick-random-weighted';

const colors = [
	['Red', 80],
	['Green', 10],
	['Blue', 10]
];
const color = pick(colors);
console.log(color)


// Population Size
const populationSize = 10;

// Function
const l = -5;
const h = 5;
const param = 2;
let pop = [];
for(let i=1; i<=populationSize; i++){
    let a1 = -5 + 10 * Math.random();
    let a2 = -5 + 10 * Math.random();
    let temp = [a1,a2];
    pop.push(temp);
}

// Function Expression x^2 + y^2

function helper(x,y){
    return x*x + y*y;
}

let fitness = [];
let prob = [];
let sum = 0;
for(let p = 0; p < pop.length; p++){
    let val = helper(pop[p][0], pop[p][1]);
    sum += val;
    fitness.push(val);
}


for(let p=0; p < pop.length; p++){
    let v = (fitness[p]/sum);
    prob.push([[pop[p][0], pop[p][1]],v]);
}

let res = pick(prob);

let newPop = [];


// CrossOver
function crosseOver(p1,p2){
    
    let point = param * Math.random();
    
    while(point == param){
        point = param * Math.random();
    }

    point = Math.floor(point);

    let c1 = [...p1.slice(0,point+1), ...p2.slice(point+1,p1.length)];
    let c2 = [...p2.slice(0,point+1), ...p1.slice(point+1,p1.length)];

    return [c1,i];
}


for(let p=0; p<pop.length/2; p++){
    let r1 = pick(prob);
    let r2 = pick(prob);

    let child = crosseOver(r1,r2);

    newPop.push(child[0], child[1]);
}
console.log(newPop)

// console.log(res);



