const {
    makeRemoteExecutableSchema,
    introspectSchema,
} = require("graphql-tools");
const { HttpLink } = require("apollo-link-http");
const { setContext } = require("apollo-link-context");
const fetch = require("node-fetch");

const remoteSchemaBuilder = (remoteSchemaObjectArray) => {
    let remoteSchemaArray = remoteSchemaObjectArray.map((schemaDetails) => {
        const link = null;
        const http = new HttpLink({ uri: schemaDetails.endpoint, fetch });
        if (schemaDetails.headers) {
            link = () => {
                return setContext((_, _) => ({
                    headers: schemaDetails.headers
                })).concat(http);
            }
        }
        const schema = await introspectSchema(link ? link : http);
        const executableSchema = makeRemoteExecutableSchema({
            schema,
            link: (link ? link : http),
        });
        return executableSchema
    })
    return remoteSchemaArray;
};

module.exports = remoteSchemaBuilder;