var PROTO_PATH = "../protos/coffeeguide.proto";

var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var coffee_proto = grpc.loadPackageDefinition(packageDefinition).coffeeguide;

/**
 * Implements the CoffeeGuide RPC service
 */
function GetCoffeeList(call, callback) {
  var data = require("./coffeeDB.json");
  const send = Array();
  data["Coffee"].forEach((e) => {
    var item = { name: e["name"], preview: e["preview"] };
    send.push(item);
  });
  callback(null, { list: send });
}

function GetCoffee(call, callback) {
  var data = require("./coffeeDB.json");
  data["Coffee"].forEach((e) => {
    if (e["name"] == call.request.name) {
      callback(null, {
        name: e["name"],
        description: e["description"],
      });
    }
  });
}

function main() {
  var server = new grpc.Server();
  server.addService(coffee_proto.CoffeeGuide.service, {
    GetCoffeeList: GetCoffeeList,
    GetCoffee: GetCoffee,
  });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
