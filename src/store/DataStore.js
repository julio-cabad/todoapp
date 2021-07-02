import { makeAutoObservable } from "mobx";
import { Order } from "../utils/HelpFunction";

class DataStore {

  queryAllTask = null;
  completedTask = null;
  unCompletedTask = null;

  constructor() {
    makeAutoObservable(this);
  }

  QueryAllTask = (task) => {
    this.queryAllTask = Order(task, "cod");
  };

  QueryCompletedTask = (resultQuery) => {
    this.completedTask = Order(resultQuery, "cod") ;
  };

  QueryUnCompletedTask = (resultQuery) => {
    this.unCompletedTask = Order(resultQuery, "cod") ;
  };
}

export { DataStore };

