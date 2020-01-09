-- add dist to the path
package.path = package.path .. ";dist/?.lua"

function dump(o)
  if type(o) == 'table' then
     local s = '{ '
     for k,v in pairs(o) do
        if type(k) ~= 'number' then k = '"'..k..'"' end
        s = s .. '['..k..'] = ' .. dump(v) .. ','
     end
     return s .. '} '
  else
     return tostring(o)
  end
end

-- temp -- defining compiletime so that we can require these files
compiletime = function(fn) end

-- function to build array of files to require
function requireFiles(filePath)
  local files = {}

  -- iterate over directories
  for dir in io.popen([[dir "]] .. filePath .. [[" /b /ad]]):lines() do 
    local otherFiles = requireFiles(filePath .. "/" .. dir)
    for i, f in pairs(otherFiles) do
      table.insert(files, f)
    end
  end

  -- iterate over files
  for file in io.popen([[dir "]] .. filePath .. [[" /b /a-d]]):lines() do 
    local requirePath = file:gsub("%.lua", "")
    requirePath = filePath .. "." .. requirePath
    requirePath = requirePath:gsub("%/", ".")
    table.insert(files, requirePath)
  end

  return files
end

-- function to import dependencies
function setupDependencies(dir)
  local filesToRequire = requireFiles(dir)
  for k, v in pairs(filesToRequire) do
    -- require file for compilation reasons
    print("requiring '" .. v .. "'")
    local testRequire = require(v)

    -- make sure we expose any values from those to global
    for i, c in pairs(testRequire) do
      print("  expose '" .. i .. "'")
      _G[i] = c
    end
  end
end

-- load libraries; then load the rest of compile things
setupDependencies("dist/compile/lib")
setupDependencies("dist/compile")

-- setup ceres layout
ceres.layout = {
  mapsDirectory = "maps/",
  srcDirectory = "dist/",
  libDirectory = "lib//",
  targetDirectory = "build/"
}