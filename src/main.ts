import { LibraryLoader } from 'war3-library-loader';
import { MapPlayer, Timer, Unit } from 'w3ts';
import { UnitIds } from 'compile/unitIds';

declare let print: (s: string) => void;

compiletime(() => {
  let origPrint = print;
  print = (str: string) => { origPrint("  " + str); };
  origPrint("compiling...");
  let [ok, err] = pcall(require, 'compile.index');
  if (!ok) {
    origPrint("Error while compiling");
    origPrint(err);
  }
  else {
    origPrint("done compiling");
  }
});

function tsMain() {
  const unit = new Unit(MapPlayer.fromIndex(0), FourCC(UnitIds.Foo), 0, 0, 270);

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
