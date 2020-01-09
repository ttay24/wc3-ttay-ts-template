export interface CeresCurrentMap {
    kind: string;
    path: string;
    objects: CeresObjects;
    added: any;
  }
  export interface CeresObjects {
    doodad?: any;
    unit: { [k: string]: any };
    ability?: any;
    destructable?: any;
    item?: any;
    buff?: any;
    upgrade?: any;
  }

  export declare let currentMap: CeresCurrentMap;