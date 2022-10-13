import pick from 'pick-random-weighted';

// Population Size
const populationSize = 500;

// Function
const l = -5;
const h = 5;
const param = 2;
let pop = [];

let best = Number.MAX_VALUE;
let mini = [];
let fit = Number.MAX_VALUE;

for(let i=1; i<=populationSize; i++){
    let a1 = -5 + 10 * Math.random();
    let a2 = -5 + 10 * Math.random();
    let temp = [a1,a2];
    pop.push(temp);
}


// Fitness
function helper(x,y){
    let val = -20*Math.exp(-0.2*Math.sqrt(0.5*(x*x+y*y))) - Math.exp(0.5*(Math.cos(2*Math.PI*x)+Math.cos(2*Math.PI*y))) + (Math.E + 20);
<<<<<<< HEAD
    // let val = x * x + y * y;
=======
>>>>>>> 1264e07ee09c19f1933b3093ac2c4141b0e4756f
    return val;
}

// CrossOver
function crosseOver(p1,p2){
    
    let point = param * Math.random();
    
    while(point == param){
        point = param * Math.random();
    }

    point = Math.floor(point);

    let c1 = [...p1.slice(0,point+1), ...p2.slice(point+1,p1.length)];
    let c2 = [...p2.slice(0,point+1), ...p1.slice(point+1,p1.length)];

    return [c1,c2];
}

let totalTimes = 1;
while(totalTimes <= 1000){
    let fitness = [];
    let prob = [];
    let sum = 0;

    // Random Population Printed
    // console.log(pop)

    for(let p = 0; p < pop.length; p++){
        let val = helper(pop[p][0], pop[p][1]);
        sum += 1/val;
        fitness.push(1/val);
    }


    // Mating Operation
    for(let p=0; p < pop.length; p++){
        let v = fitness[p]/sum;
        
        v = v*100;
        prob.push([[pop[p][0], pop[p][1]],v]);
    }
    // console.log(prob)

    let newPop = [];
    for(let p=0; p<pop.length/2; p++){
        
        let r1 = pick(prob);
        let r2 = pick(prob);
        let child = crosseOver(r1,r2);
        
        // console.log(child);
        newPop.push(child[0]);
        newPop.push(child[1]);
    }

    // console.log(newPop)
    
    let newPopPop = [];
    // Mutation
    let b = Number.MAX_VALUE;
    for(let p=0; p<newPop.length; p++){
        let v = newPop[p];
        let po = param * Math.random();
        while(po == param){
            po = param * Math.random();
        }    
        po = Math.floor(po);
        v[po] = -5 + 10 * Math.random();
        
        if(helper(v[0],v[1]) < fit){
            fit = helper(v[0],v[1]);
            mini = [v[0],v[1]];
        }

        b = Math.min(b,helper(v[0],v[1]));
        newPopPop.push(v);
    }

    // console.log(newPopPop)

    console.log(`Generation:${totalTimes}  `, b);
    best = Math.min(best,b);
    newPopPop.pop();
    newPopPop.push(mini)
    pop = newPopPop;
    
    totalTimes++;
}

// console.log("Overall Best: ", best)




