

// example creating a new object
compiletime(function() {
    /*let customFootman = currentMap.objects.unit['hfoo']:clone();
    customFootman.Name = "A Custom Footman"
    currentMap.objects.unit['x000'] = customFootman*/
});

// example exposing data from the compile stage to the script
let metadata = compiletime(function() {
    /*local metadata = {}
    for id, object in pairs(currentMap.objects.unit.all) do
        metadata[id] = object.umdl
    end*/

    //return metadata
    return {};
});

let objid = FourCC;

ceres.addHook("main::after", function() {
    let player = Player(0)
    let unit = CreateUnit(player, objid('x000'), 0, 0, 0)

    // this will print the model paths of our units
    print(metadata['x000'])
    print(metadata['ncrb'])
    print("Hello, world!")
});