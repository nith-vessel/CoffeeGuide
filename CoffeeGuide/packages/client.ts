import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

var PROTO_PATH = "../protos/coffeeguide.proto";
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
//TODO: type-safety here (how to?)
var coffee_proto = grpc.loadPackageDefinition(packageDefinition).coffeeguide;
export const getClient = () => {
  var client = new coffee_proto.CoffeeGuide(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  return {
    getCoffee({ name }) {
      return new Promise((resolve, reject) => {
        client.getCoffee({ name }, (err, response) => {
          if (err) {
            reject(err);
          }
          resolve(response);
        });
      });
    },
    getCoffeeList() {
      return new Promise((resolve, reject) => {
        client.getCoffeeList({}, function (err, response) {
          if (err) {
            reject(err);
          }
          resolve(response);
        });
      });
    },
  };
};
