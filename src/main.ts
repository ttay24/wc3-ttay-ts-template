import { LibraryLoader } from 'war3-library-loader';
import { addScriptHook, MapPlayer, Timer, Unit } from 'w3ts';
import { testFunction } from 'other';

function tsMain() {
  const unit = new Unit(MapPlayer.fromIndex(0), FourCC("hfoo"), 0, 0, 270);
  unit.name = "TypeScript single file";

  new Timer().start(1.00, true, () => {
    unit.color = ConvertPlayerColor(math.random(0, bj_MAX_PLAYERS));
  });

  testFunction();

  print("Welcome to ttay24 TypeScript!");
}

// Handle initialization 
function libLoaderLog(libName: string, success: boolean, message: string) {
  print(`Initializing "${libName}": ${success ? 'Success' : 'Failure'}, "${message}"`);
}

LibraryLoader.logFunction = libLoaderLog;
ceres.addHook("main::after", () => LibraryLoader.runInitializers());
ceres.addHook("main::after", () => tsMain());