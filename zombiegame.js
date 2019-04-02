// INSTRUCTIONS: Build a command-line based zombie fighting game. 
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).

// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5. 
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again. 

// The game ends when you or the zombie gets to 0 health. 

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic will need to be inside the .then() function for your prompt. 

// ===========================================================================================================

let i = require("inquirer");
let cl = (m) => {
    console.log(m);
}
let r = (n) => {
    return Math.floor((Math.random() * n) + 1);
}


let players = {
    zombie: {
        A: 0,
        D: 0,
        HP: 15,
    },
    user: {
        A: 0,
        D: 0,
        HP: 70,
        N: "",
    },
}

let level = 1;
let set = {
    za: (n) => {
        players.zombie.A = r(n);
    },
    zd: (n) => {
        players.zombie.D = r(n);
    },
    pa: (n) => {
        players.user.A = r(n);
    },
    pd: (n) => {
        players.user.D = r(n);
    },
    r: false,
    zhp: (n) => {
        players.zombie.HP = (15*n);
    },
    uhp: (n) => {
        players.user.HP = 70;
    },
    hpc: () => {
        if(players.zombie.HP < 0){
            players.zombie.HP = 0;
        }
        else if(players.user.HP < 0){
            players.user.HP = 0;
        }
        else{
            return;
        }
    }
}
let run = () => {
    i.prompt([
        {
            type: "list",
            message: "Choose to attack or defend against the zombies!",
            choices: ["Attack!!", "Defend!!"],
            name: "selection",
        }
    ]).then((re) => {
        if(re.selection === "Attack!!"){
            set.pa(5);
            set.zd(5);

            if(players.zombie.D <= players.user.A){
                players.zombie.HP -= players.user.A;
                set.hpc();
                cl("\n\nYOU GOT THE ZOMBIE!!!!");
                cl("\nYou've inflicted " + players.user.A + " damage to the zombie!!");
                cl("\nIt only has " + players.zombie.HP + " HP left!\n\n");
            }
            else{
                let t = r(10);
                players.user.HP -= t;
                set.hpc();
                cl("\n\nOUCH!! the zombie got you!!!!");
                cl("\nIt inflicted " + t + " damage to you " + players.user.N);
                cl("\nYou only have " + players.user.HP + " HP left\nBetter be careful!\n\n");
            }
        }
        else if(re.selection === "Defend!!"){
            set.pd(10);
            set.za(10);
            let t = r(5);

            if(players.zombie.A <= players.user.D){
                players.zombie.HP -= t;
                set.hpc();
                cl("\n\nYOU DEFENDED AGAINST THE ZOMBIE ATTACK!");
                cl("\n Nice Counter Attack " + players.user.N + "!");
                cl("\nYou've inflicted " + t + " damage to the zombie!!");
                cl("\nIt only has " + players.zombie.HP + " HP left!\n\n");  
            }
            else{
                players.user.HP -= players.zombie.A;
                set.hpc();
                cl("\n\nOUCH!! the zombie got you!!!!");
                cl("\nIt inflicted " + players.zombie.A + " damage to you " + players.user.N);
                cl("\nYou only have " + players.user.HP + " HP left\nBetter be careful!\n\n");
            }
        }
        else{
            cl("ERROR with selection name!!!");
        }
        if (players.user.HP > players.zombie.HP && (players.user.HP <=0 || players.zombie.HP <=0)){
            level++;
            cl("\n\n CONGRATS!! You've defeated the zombie and advanced to Level: " + level + " !!!!!\n\n");
            i.prompt([
                {
                    type: "list",
                    message: "Would you like to look for more?",
                    choices: ["Lets go hunting!", "I'll just wait here to be eaten"],
                    name: "selection",
                }
            ]).then((res) => {
                if(res.selection === "Lets go hunting!"){
                    set.zhp(level);
                    run();
                }
                else{
                    cl("I'll come back for your items " + players.user.N);
                    setTimeout(() => {
                        cl("\n\n\nSmell you later!\n\n\n\n");    
                    }, 2000);
                }
            });
        }
        else if (players.user.HP < players.zombie.HP && (players.user.HP <=0 || players.zombie.HP <=0)){
            cl("\n\n\nYou Died!");
            i.prompt([
                {
                    type: "list",
                    message: "Would you like to play again?",
                    choices: ["Yes", "No"],
                    name: "selection",
                }
            ]).then((resp) => {
                if(resp.selection === "yes"){
                    set.zhp(level);
                    set.uhp();
                    run();
                }
                else{
                    cl("See ya " + players.user.N);
                    setTimeout(() => {
                        cl("\n\n\nSmell you later!\n\n\n\n");    
                    }, 2000);
                }
            });
        }
        else{
            run();
        }
    });
}


i.prompt([
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
]).then((r) => {
    if(r.name === ""){
        players.user.N = "Random Person I've Never Met";
    }
    else{
        players.user.N = r.name;
    }
    
    cl("\n\nHey " + players.user.N + "!!!\nLevel " + level + " Is Starting!!\n\npssssst....\nthe zombies are coming!");

    setTimeout(() => {
        cl("\n\nRUN!!!!!!!\n\n");
        setTimeout(() => {
            cl("Too Late! You've been caught in the fight!\nGet ready to fight!\n\n\n");
        }, 1000);
    }, 1000);

    setTimeout(() => {
        set.zhp(level);
        run();
    }, 4000);

});


