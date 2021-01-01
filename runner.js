const http = require("http");
const fs = require('fs');
const { execSync } = require("child_process");

var json_path = "./json/";
//for fun until we need a real db
var db_path = "db/db.json";

function eval_output(json) {

    var out = {};
    var status = {};

    scoped_stdout = execSync(json['exec_cmd'], {encoding: 'utf8'});
    console.log(scoped_stdout);

    if (scoped_stdout == json['outputs']['good']) {
        console.log("good output");
        status['good'] = 1;
    }

    else if (scoped_stdout == json['outputs']['bad']) {
        console.log("bad output"); 
        status['bad'] = 1;
    }
    else {
	console.log("undefined output");
        status['undef'] = 1;
    }

    out.name = json['name'];
    out.status = status;
    out.runtime = Date.now();
    out.stdout = scoped_stdout;

    return out;
}

module.exports = {

    main: function runnerMain() {

        var files = fs.readdirSync(json_path);
        var db = {};
        var i = 0;

        files.forEach(file => {

            var rawdata = fs.readFileSync(json_path+file);
            var jdata = JSON.parse(rawdata);
            var tname = "task"+i;

            db[tname] = eval_output(jdata);

            i++;

        });

        try {
            fs.writeFileSync(db_path, JSON.stringify(db))
        } 
        catch (err) {
            console.error(err)
        }

    }
}
