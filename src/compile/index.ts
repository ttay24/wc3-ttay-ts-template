import { CeresUnit } from "./lib/CeresUnit";
import { currentMap } from "./lib/ceresDefs";
import { FooUnit } from "./units/foo";

compiletime(() => {
  let unitDefs: CeresUnit[] = [];
  let abilityDefs = {};

  print("COMPILING");

  // add unit defs
  unitDefs.push(new CeresUnit('HfoA', 'Hblm'));
  unitDefs.push(new FooUnit());

  // create units
  print("creating units");
  for (let u of unitDefs) {
    u.compile();
  }
  print("done compiling unit");

  // test
  for (let k in currentMap.objects.unit.all) {
    //print(k);
    let u = currentMap.objects.unit[k];
    //print(u.Name);
  }
});

// example exposing data from the compile stage to the script
export function exportMetadata() {
  /*local metadata = {}
  for id, object in pairs(currentMap.objects.unit.all) do
      metadata[id] = object.umdl
  end*/

  //return metadata
  return {};
}

