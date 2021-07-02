/**
 * Execute sql queries
 *
 * @param sql
 * @param params
 *
 * @returns {resolve} results
 */

import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(false);

/*Open DB*/

global.db = SQLite.openDatabase(
  {
    name: "todoapp.db",
    location: "default",
    createFromLocation: "~todoapp.db",
  },
  () => {
    console.log("---Database Open---");
  },
  error => {
    console.log("ERROR: " + error);
  },
);

const queryRows = (rows) => {
  const result = [];

  for (let i = 0; i < rows.length; i++) {
    let item = rows.item(i);
    result.push(item);
  }

  return result;
};

const ExecuteQuery = (sql, params = []) => new Promise(async (resolve, reject) => {
  await db.transaction((trans) => {
    trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
  });
});

export const CreateTable = async () => {
  await ExecuteQuery("CREATE TABLE IF NOT EXISTS task (cod VARCHAR(10) PRIMARY KEY NOT NULL, title VARCHAR(200), deadLine VARCHAR(50), startTime VARCHAR(10), endTime VARCHAR(10), remind VARCHAR(50), repeat VARCHAR(20),checkTask INTEGER)", []);
};

/*Task*/

const QUERY_TASK = "SELECT * FROM task";
const INSERT_TASK = "INSERT INTO task (cod, title, deadLine, startTime, endTime, remind, repeat, checkTask) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
const UPDATE_TASK = "UPDATE task SET checkTask = ? WHERE cod = ?";
const QUERY_COMPLETED_TASK = "SELECT * FROM task  WHERE  checkTask = ?";
const QUERY_UNCOMPLETED_TASK = "SELECT * FROM task  WHERE  checkTask = ?";

export const queryTask = async () => {
  let selectQuery = await ExecuteQuery(QUERY_TASK, []);
  let rows = selectQuery.rows;
  return queryRows(rows);
};

export const insertTask = async data => {
  await ExecuteQuery(INSERT_TASK, data);
};
export const updateTask = async update => {
  await ExecuteQuery(UPDATE_TASK, update);
};
export const queryCompleted = async (query) => {
  let selectQuery = await ExecuteQuery(QUERY_COMPLETED_TASK, query);

  let rows = selectQuery.rows;

  return queryRows(rows);
};
export const queryUncompleted = async (query) => {
  let selectQuery = await ExecuteQuery(QUERY_UNCOMPLETED_TASK, query);

  let rows = selectQuery.rows;

  return queryRows(rows);
};
