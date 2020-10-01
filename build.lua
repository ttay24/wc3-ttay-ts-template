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

-- setup ceres layout
ceres.layout = {
  mapsDirectory = "maps/",
  srcDirectories = {"dist/"},
  libDirectory = "lib//",
  targetDirectory = "build/"
}