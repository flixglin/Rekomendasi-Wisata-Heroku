var developmentDatabase = {
    postgres: {
        host: 'ec2-54-216-159-235.eu-west-1.compute.amazonaws.com',
        port: 5432,
        database: 'de0528i2vmrkdm',
        user: 'xpzaashsdlbksb',
        password: '663faed8e2825bc62348f228d4cacec5f9f18a1b8a7c9c8224ccb8c3ba4628fd'
    }
}

var connectionString = "postgres://xpzaashsdlbksb:663faed8e2825bc62348f228d4cacec5f9f18a1b8a7c9c8224ccb8c3ba4628fd@ec2-54-216-159-235.eu-west-1.compute.amazonaws.com:5432/de0528i2vmrkdm?ssl=true";
if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
        developmentDatabase =
            parseConnectionString(process.env.DATABASE_URL);
    } else {
        console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
        developmentDatabase = parseConnectionString(connectionString);
    }
} else {
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
}

function parseConnectionString(connectionString) {
    if (connectionString) {
        var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
        var match = myRegexp.exec(connectionString);
        if (match.length == 6) {
            developmentDatabase.postgres.user = match[1];
            developmentDatabase.postgres.password = match[2];
            developmentDatabase.postgres.host = match[3];
            developmentDatabase.postgres.port = Number(match[4]);
            developmentDatabase.postgres.database = match[5];
            developmentDatabase.postgres.ssl = {
                rejectUnauthorized: false
            };
            return developmentDatabase;
        }
    }
    console.log("connectionString cannot be parsed");
    return null;
}
module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
        postgres: developmentDatabase.postgres
    }
}

