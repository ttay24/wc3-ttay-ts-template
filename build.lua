-- add dist to the path
package.path = package.path .. ";dist/?.lua"

-- TEST
function scandir(directory)
  local i, t, popen = 0, {}, io.popen
  local pfile = popen('ls -a "'..directory..'"')
  for filename in pfile:lines() do
      i = i + 1
      t[i] = filename
  end
  pfile:close()
  return t
end

-- setup any compiletime ts classes
CeresUnit = require("compile.lib.CeresUnit").CeresUnit

--compiletime = function(fn) end
--require("compile.index");

-- setup ceres layout5kbiv
ceres.layout = {
  mapsDirectory = "maps/",
  srcDirectory = "dist/",
  libDirectory = "lib//",
  targetDirectory = "build/"
}