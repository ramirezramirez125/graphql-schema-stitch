const {
    mergeSchemas
} = require("graphql-tools");
const remoteSchemaBuilder = require("./remoteSchema/remoteSchemaBuilder");
const localSchemaBuilder = require("./localSchema/localSchemaBuilder");

const graphQLSchemaStitch = (remoteSchemaObjectArray, localSchemaObjectArray) => {
    let remoteSchema = [], localSchema = [];
    if (remoteSchemaObjectArray) {
        remoteSchema = remoteSchemaBuilder(remoteSchemaObjectArray);
    }
    if (localSchemaObjectArray) {
        localSchema = localSchemaBuilder(localSchemaObjectArray);
    }
    return mergeSchemas({
        schemas: remoteSchema.concat(localSchema)
    });
};

module.exports = { graphQLSchemaStitch }