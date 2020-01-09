import { CeresCurrentMap } from "compile/lib/ceresDefs";

declare let currentMap: CeresCurrentMap;

//_G.CeresUnit = require("compile.lib.CeresUnit").CeresUnit

export class CeresUnit {
  private u: any;
  private unitId: string;

  constructor(unitId: string, baseUnitId: string) {
    // test
    print("created unit");
    this.unitId = unitId;
    this.u = currentMap.objects.unit[baseUnitId].clone();
  }

  public compile(): void {
    currentMap.objects.unit[this.unitId] = this.u;
  }

  set name(n: string) { 
    this.u.Name = n; 
  }
  
  get name(): string { 
    return this.u.Name;
  }

  public static test(): void {
    print("test");
  }

}
