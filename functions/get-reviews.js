function main(params) {
  return new Promise(function (resolve, reject) {
    const { CloudantV1 } = require("@ibm-cloud/cloudant");
    const { IamAuthenticator } = require("ibm-cloud-sdk-core");
    const authenticator = new IamAuthenticator({
      apikey: "LCAL2Vi4O5m2hRBcMXvAWCJ6KKwvT4yFdpLFuFPBslpQ", // TODO: Replace with your own API key
    });
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator,
    });
    cloudant.setServiceUrl(
      "https://4344bd52-43bf-4240-9523-da3f8329b645-bluemix.cloudantnosqldb.appdomain.cloud"
    ); // TODO: Replace with your own service URL
    dealership = parseInt(params.dealerId);
    // return reviews with this dealer id
    cloudant
      .postFind({
        db: "reviews",
        selector: {
          dealership: parseInt(params.dealerId),
        },
      })
      .then((result) => {
        let code = 200;
        if (result.result.docs.length == 0) {
          code = 404;
        }
        resolve({
          statusCode: code,
          headers: { "Content-Type": "application/json" },
          body: result.result.docs,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// example invocation
let result = main({ dealerId: 15 });
result.then((reviews) => console.log(reviews));
