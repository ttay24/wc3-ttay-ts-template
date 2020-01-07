import { LibraryLoader } from 'war3-library-loader';
import { MapPlayer, Timer, Unit } from 'w3ts';
import { exportMetadata } from 'compile/index';

function tsMain() {
  // example exposing data from the compile stage to the script
  let metadata = compiletime(exportMetadata);

  const unit = new Unit(MapPlayer.fromIndex(0), FourCC("hfoo"), 0, 0, 270);

  new Timer().start(1.00, true, () => {
    unit.color = ConvertPlayerColor(math.random(0, bj_MAX_PLAYERS));
  });

  print("Welcome to ttay24 TypeScript!");
}

// Handle initialization 
function libLoaderLog(libName: string, success: boolean, message: string) {
  print(`Initializing "${libName}": ${success ? 'Success' : 'Failure'}, "${message}"`);
}

LibraryLoader.logFunction = libLoaderLog;
ceres.addHook("main::after", () => LibraryLoader.runInitializers());
ceres.addHook("main::after", () => tsMain());
