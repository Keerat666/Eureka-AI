const connection = require("../middlewares/connection")
module.exports = {


  generateTableQuery(UserModel, foreign_key, foreign_table,foreignID) {
    const modelName = UserModel.collection.collectionName;
    const tableName = modelName.toLowerCase();
    const columns = [
      "id INT AUTO_INCREMENT PRIMARY KEY",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    ];
  
    const schemaObj = UserModel.schema.obj;
    for (const key in schemaObj) {
      if (schemaObj.hasOwnProperty(key)) {
        const field = schemaObj[key];
        const columnDefinition = `${key} ${this.getSQLTypeFromMongooseType(field.type)}${
          field.required ? " NOT NULL" : ""
        }`;
        
        // Check if the current key matches the provided foreign_key
        if (key === foreign_key) {
          const foreignKeySQL = `FOREIGN KEY (${key}) REFERENCES ${foreign_table}(${foreignID})`;
          columns.push(foreignKeySQL);
        } else {
          columns.push(columnDefinition);
        }
      }
    }

    const createTableQuery = `CREATE TABLE ${tableName} (${columns.join(", ")});`;
    return createTableQuery;
},

generateTableQuerySimple(UserModel) {
  const modelName = UserModel.collection.collectionName;
  const tableName = modelName.toLowerCase();
  const columns = [
    "id INT AUTO_INCREMENT PRIMARY KEY",
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  ];

  const schemaObj = UserModel.schema.obj;
  for (const key in schemaObj) {
    if (schemaObj.hasOwnProperty(key)) {
      const field = schemaObj[key];
      const columnDefinition = `${key} ${this.getSQLTypeFromMongooseType(field.type)}${
        field.required ? " NOT NULL" : ""
      }`;

      columns.push(columnDefinition);
    }
  }

  const createTableQuery = `CREATE TABLE ${tableName} (${columns.join(", ")});`;
  return createTableQuery;
}


    ,

     getSQLTypeFromMongooseType(mongooseType) {
      switch (mongooseType) {
        case String:
          return "VARCHAR(5000)";
        case Number:
          return "INT";
        case Date:
          return "TIMESTAMP";
        // Add more cases for other supported Mongoose types as needed
        default:
          return "VARCHAR(5000)";
      }
    },

    createTableComplex(req,res,UserModel)
    {

        const fkey = req.body.fKey;

        //the key in the current table to be linked
        const foreign_key= req.body.foreignKey

        //the table with which we want to link
        const foreign_table= req.body.foreignTable

        //the key in the table with which we want to link
        const foreignID = req.body.foreignID

        const createTableQuery = this.generateTableQuery(UserModel,foreign_key,foreign_table,foreignID);
        console.log(createTableQuery);
        connection.query(createTableQuery, req.body, (error, results) => {
            if (error) {
              const data = {err : error, errorStatus : true}
              return res.status(500).json(data);
            } else {
              const data = {results : results, errorStatus : false}
              return res.status(201).json(data);
            }
          });

    },

    createTable(req,res,UserModel)
    {
        const createTableQuery = this.generateTableQuerySimple(UserModel);
        console.log(createTableQuery);
        connection.query(createTableQuery, req.body, (error, results) => {
            if (error) {
              const data = {err : error, errorStatus : true}
              return res.status(500).json(data);
            } else {
              const data = {results : results, errorStatus : false}
              return res.status(201).json(data);
            }
          });

    },

    createEntry(req, res, tableName)

    {
            //const query = 'Insert into '+tableName+" SET ?"
            const query = `INSERT INTO ${tableName} SET ?`
            console.log(query)
            console.log(req.body)
            connection.query(query, req.body, (error, results) => {
                if (error) {
                  const data = {err : error, errorStatus : true}
                  return res.status(500).json(data);
                } else {
                    const data = {results : results, errorStatus : false}
                    return res.status(201).json(data);
                }
              });


    },


    getAllEntries(req, res, tableName)

    {

        const query = `SELECT * from ${tableName}`
        console.log(query)
        console.log(req.body)
        connection.query(query, req.body, (error, results) => {
            if (error) {
                const data = {err : error, errorStatus : true}
                return res.status(500).json(data);
            } else {
                const data = {results : results, errorStatus : false}
                return res.status(201).json(data);
            }
          });
    },

    getAllEntriesByID(req, res, tableName)

    {

        const query = `SELECT * from ${tableName} where ${req.query.key} = ${req.query.id}`
        console.log(query)
        console.log(req.body)
        connection.query(query, req.body, (error, results) => {
            if (error) {
                const data = {err : error, errorStatus : true}
                return res.status(500).json(data);
            } else {
                const data = {results : results, errorStatus : false}
                return res.status(201).json(data);
            }
          });
    },


    getEntryByID(req, res, tableName)

    {
        const query = `SELECT * from ${tableName} where ${req.param.key} = ${req.query.id}`
        console.log(query)
        console.log(req.query.id)
        connection.query(query, req.body, (error, results) => {
            if (error) {
                const data = {err : error, errorStatus : true}
                return res.status(500).json(data);
            } else {
                const data = {results : results, errorStatus : false}
                return res.status(201).json(data);
            }
          });
    },

    

    deleteEntryByID(req, res, tableName)

    {

        const query = `DELETE from ${tableName} where id = ${req.query.id}`
        console.log(query)
        console.log(req.query.id)
        connection.query(query, req.body, (error, results) => {
            if (error) {
                const data = {err : error, errorStatus : true}
                return res.status(500).json(data);
            } else {
                const data = {results : results, errorStatus : false}
                return res.status(201).json(data);
            }
          });
          

    },

     generateUpdateQueryById(model, id, updates) {
        const tableName = "user"
        const setValues = [];
      
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            const value = updates[key];
            setValues.push(`${key} = '${value}'`);
          }
        }
      
        const setClause = setValues.join(', ');
        const updateQuery = `UPDATE ${tableName} SET ${setClause} WHERE id = ${id};`;
      
        return updateQuery;
      },
      

    updateEntryByID(req, res, userModel,tableName) {

        const updateQuery = this.generateUpdateQueryById(userModel, req.query.id, req.body);

        console.log(updateQuery)
        console.log(req.query.id)
        connection.query(updateQuery, req.body, (error, results) => {
            if (error) {
                const data = {err : error, errorStatus : true}
                return res.status(500).json(data);
            } else {
                const data = {results : results, errorStatus : false}
                return res.status(201).json(data);
            }
          });

    }

}