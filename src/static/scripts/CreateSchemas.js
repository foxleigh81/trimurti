import fs from 'fs';
import chalk from 'chalk';
import axios from 'axios';
import GenerateSchema from 'generate-schema';

export default class CreateSchemas {
  getJson(feed) {
    let t = this;
    // Retrieves a usable json feed from an API (specified in answers array)
    return axios.get(feed)
    .then(function(response) {
      console.log(chalk.cyan('Json feed found and ready to process.'));
      t.processJson(response);
    })
  }

  getRoutes() {
    // Loops through the answers array to get the routes that have been specified
    // by the user
  }

  processJson(feed) {
    // Processes each route and outputs a schema file for each route
    console.log(chalk.cyan('Please wait, processing...'));
    var schema = GenerateSchema.json('route', feed);
    console.log(schema);
    // TODO: Get this schema into a format that is usable by Vulcan
  }

  createSchema() {
    // Takes the schema generated by 'processJson()' and writes it to vulcanrc.js (Maybe)
  }

  init() {
    //this.answers = answers;
    this.getJson('https://jsonplaceholder.typicode.com/posts')
  }

}
