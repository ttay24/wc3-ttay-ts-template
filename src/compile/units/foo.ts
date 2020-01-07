import { CeresUnit } from "compile/lib/CeresUnit";
import { UnitIds } from "compile/unitIds";

export class FooUnit extends CeresUnit {
  constructor() {
    super(UnitIds.Foo, 'Hblm');

    this.name = "test unit";
  }
}
