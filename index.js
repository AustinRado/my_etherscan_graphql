const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

const resolvers = {
  Query: {
    // Get ether balance for an address
    etherBalanceByAddress: (root, _args, {
        dataSources
      }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Get total supply of ether
    totalSupplyOfEther: (root, _args, {
        dataSources
      }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Get latest ethereum price
    latestEthereumPrice: (root, _args, {
        dataSources
      }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Get block confirmation time
    blockConfirmationTime: (root, _args, {
        dataSources
      }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// insert code comment
server.timeout = 0;
// The server is now listening on port 9000
server.listen("9000").then(({
  url
}) => {
  console.log(`🚀 Server ready at ${url}`);
});