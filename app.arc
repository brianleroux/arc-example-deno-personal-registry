@app
mymodules

@static
folder dist

@http
get / # list modules in dist
get /x/:module # redirect to latest version of module

# TODO:
@begin
lint "deno fmt src" # prettier code
test "deno test src" # run the unit tests
build "deno run -A build.ts" # write versions to dist
