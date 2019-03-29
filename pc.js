var pc = require('pc');
var inquirer = require('inquirer');
const chalk = require('chalk');

// PC Memory ------------------------------------------------------------------------------------------------------------------------------------------------------
var precentageMemoryUsedVar ="";

function precentageMemoryUsed(){
    var total = pc.memory().total;
    var free = pc.memory().free;
    var number = (((free/total)*(-10000))+10000);
    precentageMemoryUsedVar = (Math.round(number)/100);
    memoryGraph();
}

function memoryGraph(){
    var mGraphicUsed ="";
    var mGraphicFree ="";
    var numberSeperator = Math.round(precentageMemoryUsedVar);
    for(var i = 0; i < numberSeperator; i++){
        mGraphicUsed = mGraphicUsed + "=";
    }
    for(var i = 0; i < ((numberSeperator - 100)* (-1)); i++){
        mGraphicFree = mGraphicFree + "=";
    }
    console.log("[" + chalk.redBright(mGraphicUsed) + chalk.greenBright(mGraphicFree) + "]" + chalk.redBright(precentageMemoryUsedVar + "%") );
}

function upDateMemoryGraphic(){
    console.log("");
    console.log(" -------------------------------------- " + chalk.bold("PC memory useage graph:") + " -------------------------------------- ");
    console.log("");
    console.log("                                      " + "Use control + 'C'  to exit");
    setInterval(precentageMemoryUsed, 250);
}

// Run Time ------------------------------------------------------------------------------------------------------------------------------------------------------

function runtime(){
    var pcRuntime = pc.uptime().time;
    var hour = Math.round(pcRuntime/3600);
    var minute = Math.round(pcRuntime/60);
    var second = pcRuntime
    console.log("Uptime in hours: " + chalk.bold.blueBright(hour) + "| Uptime in minutes: " + chalk.bold.greenBright(minute) + "|  Uptime in seconds: " + chalk.bold.yellowBright(second));
}
function runtimeUpdater(){
    console.log("");
    console.log(" ------------------------------ " + chalk.bold("PC uptime") + " ------------------------------")
    console.log("");
    console.log("                        " + "Use control + 'C'  to exit");
    setInterval(runtime, 1000);
}

// CPU loadPercentage ------------------------------------------------------------------------------------------------------------------------------------------------------


function cpuLoadPrecentage(){
    pc.cpu().then(function(cpu){
        var loadPercentage = cpu.loadPercentage;
        var loadPercentageUsed ="";
        var loadPercentageFree ="";    
        for(var i = 0; i < loadPercentage; i++){
            loadPercentageUsed = loadPercentageUsed + "#";
        }
        for(var i = 0; i < ((loadPercentage - 100)* (-1)); i++){
            loadPercentageFree = loadPercentageFree + "#";
        }
        console.log("[" + chalk.redBright(loadPercentageUsed) + chalk.greenBright(loadPercentageFree) + "]" + chalk.redBright(loadPercentage + "%") );
    });
};

function cpuLoadPrecentageWarning(){
    console.log("");
    console.log(chalk.bold.redBright("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Warning !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"));
    console.log("                      By using this function you are add additional load to your CPU"); 
    setTimeout(cpuLoadPrecentageUpdater, 1000);

}


function cpuLoadPrecentageUpdater(){
    console.log("");
    console.log(" ----------------------------------------------" + chalk.bold.blueBright(" CPU Load ") + "----------------------------------------------")
    console.log("");
    console.log("                                        " + "Use control + 'C'  to exit");
    setInterval(cpuLoadPrecentage, 1000);
};  


// Question Prompt ------------------------------------------------------------------------------------------------------------------------------------------------------

var systemOptions =  {
    type: 'list',
    name: 'options',
    message: 'What infomation would you like to see?',
    choices: ['PCinfo', 'Memory', 'Uptime', 'CPUload'],
    filter: function(val) {
    return val.toLowerCase();
    }
};

function main() {
    console.log("");
    console.log("           " +chalk.bold.magentaBright('Welcome to System options'));
    console.log("");
    optionsScreen();
    };

function optionsScreen(){
    inquirer.prompt(systemOptions).then(answers => {
        if(answers.options == "pcinfo"){
            pc.getAll().then(function(everything){
                console.log(everything)
              });
        }
        if(answers.options == "memory"){
            upDateMemoryGraphic();
        }
        if(answers.options == "uptime"){
            runtimeUpdater();
        }
        if(answers.options == "cpuload"){
            cpuLoadPrecentageWarning();  
        }
    });
};

main();