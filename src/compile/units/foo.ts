import { CeresUnit, UnitFieldRawCodes } from "wc3-ts-ceres";
import { UnitIds } from "compile/unitIds";

export class FooUnit extends CeresUnit {
  constructor() {
    super(UnitIds.Foo, 'Hblm');

    this.setName("test unit");
    this.u[UnitFieldRawCodes.Text.ProperNames] = "Super Test Name,Super Test 2";
  }
}
