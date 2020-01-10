import { CeresUnit } from "wc3-ts-ceres";
import { UnitIds } from "compile/unitIds";

export class FooUnit extends CeresUnit {
  constructor() {
    super(UnitIds.Foo, 'Hblm');

    this.name = "test unit";
  }
}
