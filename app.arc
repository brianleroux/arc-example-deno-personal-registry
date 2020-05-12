@app
mymodules

@static
folder dist

# TODO:
@begin
lint "deno fmt src" # prettier code
test "deno test src" # run the unit tests
build "deno run -A build.ts" # write versions to dist
