import fs from 'fs';
import chalk from 'chalk';
import axios from 'axios';
import GenerateSchema from 'generate-schema';

export default class CreateSchemas {
  getJson(route) {
    let t = this;
    // Retrieves a usable json feed from an API (specified in answers array)
    let getURL = route ? t.answers.API+'/'+route : t.answers.API;
    return axios.get(getURL)
    .then(function(response) {
      console.log(chalk.green('✔ Json feed found at', t.answers.API+'/'+route, 'processing...'));
      t.processJson(response, route);
    })
  }

  getRoutes() {
    let route = this.answers.Routes.split(',');
    if(route.length !== 0) {
      for (var i = 0; i < route.length; i++) {
        console.log(chalk.gray('Please wait, processing', route[i], 'route ...'));
        this.getJson(route[i]);
      }
    } else {
      this.getJson();
    }

    return console.log(chalk.green('✔ Processing complete'));
  }

  processJson(feed, route) {
    // Processes each route and outputs a schema file for each route
    // FIXME: GenerateSchema is not working properly, check docs tomorrow
    var schema = GenerateSchema.json(route, feed);
    return this.createSchema(schema, route);
  }

  createSchema(schema, route) {
    // Takes the schema generated by 'processJson()' and writes it to to a file
    fs.writeFile('./vulcan/core/routes/'+route+'.js', JSON.stringify(schema, null, 4), 'utf8', function (err) {
      if (err) { return console.log(err); }
    });
    return console.log(chalk.green('✔ Processing of' ,route, 'complete'));
  }

  init(answers) {
    this.answers = answers;
    //this.getJson('https://jsonplaceholder.typicode.com/posts')
    this.getRoutes();
  }

}