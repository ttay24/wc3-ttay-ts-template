-- add dist to the path
package.path = package.path .. ";dist/?.lua"

-- TEST
function requireFiles(filePath)
  -- iterate over directories
  for dir in io.popen([[dir "]] .. filePath .. [[" /b /ad]]):lines() do 
    print(dir) 
  end

  -- iterate over files
  for file in io.popen([[dir "]] .. filePath .. [[" /b]]):lines() do 
    print(file) 
  end
end

requireFiles("dist/compile")

-- setup any compiletime ts classes
--CeresUnit = require("compile.lib.CeresUnit").CeresUnit

--compiletime = function(fn) end
--require("compile.index");

-- setup ceres layout5kbiv
ceres.layout = {
  mapsDirectory = "maps/",
  srcDirectory = "dist/",
  libDirectory = "lib//",
  targetDirectory = "build/"
}