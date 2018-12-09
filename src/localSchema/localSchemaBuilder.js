const { makeExecutableSchema } = require("graphql-tools");

const localSchemaBuilder = (localSchemaObjectArray) => {
    let localSchemaArray = localSchemaObjectArray.map((schemaDetails) => {
        if (schemaDetails.schema) {
            return schemaDetails.schema;
        }
        let localSchema = makeExecutableSchema({
            typeDefs: schemaDetails.typeDefs,
            resolvers: schemaDetails.resolvers
        });
        return localSchema
    });
    return localSchemaArray;
}

module.exports = localSchemaBuilder;

/*
    Sample localschemaarray = [{
        schema: schema
    },
{
    typeDefs: NewTypeDefs,
    resolvers: NewResolver
}]
*/