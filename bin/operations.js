const fs = require("fs-extra");
const War3TSTLHelper = require("war3tstlhelper");
const execFile = require("child_process").execFile;
const cwd = process.cwd();
const exec = require('child_process').exec;
const luamin = require('luamin');

// Parse configuration
let config = {};
try {
  config = JSON.parse(fs.readFileSync("config.json"));
} catch (e) {
  return console.error(e);
}

// Handle the operation
const operation = process.argv[2];

switch (operation) {
  case "build":
    const tsLua = "./dist/tstl_output.lua";

    /*if (!fs.existsSync(tsLua)) {
      return console.error(`Could not find "${tsLua}"`);
    }*/

    console.log(`Building "${config.mapFolder}"...`);
    /*fs.copy(`./maps/${config.mapFolder}`, `./dist/${config.mapFolder}`, function (err) {
      if (err) {
        return console.error(err);
      }

      // Merge the TSTL output with war3map.lua
      const mapLua = `./dist/${config.mapFolder}/war3map.lua`;

      if (!fs.existsSync(mapLua)) {
        return console.error(`Could not find "${mapLua}"`);
      }

      try {
        let tsLuaContents = fs.readFileSync(tsLua);
        if (config.minifyScript) {
          console.log(`Minifying script...`);
          tsLuaContents = luamin.minify(tsLuaContents.toString());
        }
        fs.appendFileSync(mapLua, tsLuaContents);

      } catch (err) {
        return console.error(err);
      }

      console.log(`Completed!`);
    });*/

    // create build folder if it doesn't exist
    fs.ensureDirSync(`${cwd}/build`);
    fs.ensureDirSync(`${cwd}/src`);
    fs.ensureDirSync(`${cwd}/lib`);

    // create temporary ceres.toml to prevent ceres from throwing an error
    //fs.writeFileSync("ceres.toml", '[run]\nwc3_start_command=""');

    // build war3map.lua with ceres
    stderror_messages = false
    ceres = execFile("./bin/ceres", ["build", "--", "--map", config.mapFolder], function (err, data) {
      if (data.length > 0) 
        console.log(data);
      if (err != null) {
        console.error(err);
        console.error("There was an error launching ceres.");
      }
    })
    stderror_messages = false;
    ceres.stderr.on(
      'data',
      function (data) {
        lines = data.split("\n")
        stderror_messages = lines.some(l=>l.startsWith("> ERR:"));
        log = stderror_messages ? console.error : console.log;
        log(lines.join("\n  "))
      }
    )
    ceres.addListener("exit", function (code, signal){

      if(code !== 0) {
        console.error("Failure! (return code: {}".format(code));
      } else if(stderror_messages) {
        console.error("Failure!");
      } else {
        console.log(`Completed!`);
      }
    });

    break;

  case "run":
    const filename = `${cwd}/build/${config.mapFolder}`;

    console.log(`Running ${filename}...`);

    execFile(config.gameExecutable, ["-loadfile", filename, ...config.launchArgs], (err, stdout, stderr) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return console.error(`No such file or directory "${config.gameExecutable}". Make sure gameExecutable is configured properly in config.json.`);
        }
        return console.error(err);
      }
    });

    break;
  case "gen-defs":
    // Create definitions file for generated globals
    const luaFile = `${cwd}/maps/${config.mapFolder}/war3map.lua`;

    try {
      const contents = fs.readFileSync(luaFile, "utf8");
      const parser = new War3TSTLHelper(contents);
      const result = parser.genTSDefinitions();
      fs.writeFileSync("src/war3map.d.ts", result);
    } catch (err) {
      console.log(err);
      console.log(`There was an error generating the definition file for '${luaFile}'`);
      return;
    }

    break;
}
