import { FooUnit } from "./units/foo";
import { CeresUnit } from "wc3-ts-ceres";

let unitDefs: CeresUnit[] = [];
let abilityDefs = {};

// add unit defs
unitDefs.push(new CeresUnit('HfoA', 'Hblm'));
unitDefs.push(new FooUnit());

// create units
print("creating units");
for (let u of unitDefs) {
  u.compile();
}
print("done compiling unit");

