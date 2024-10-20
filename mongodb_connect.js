// Import MongoClient
const { MongoClient } = require('mongodb');

// Connection URI (replace with your actual URI)
const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/sample_airbnb?retryWrites=true&w=majority";

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected successfully to MongoDB");
        
        // List databases
        await listDatabases(client);
    } catch (e) {
        console.error("An error occurred:", e);
    } finally {
        // Close the connection
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Run the main function
main().catch(console.error);
