// install express using "npm i express" this is used for backend framwork
// install cheerio "npm i cheerio" this is used to pick up html elements on a webpage
// install acios "npm i axios" this is a promise based HTTP client for browser & node.js , this make easy to do http request and crud operations
//nodemon is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected
// express 4.17.1 is used in tutorial, if any error comes change it.

const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = "https://www.theguardian.com/international"
axios(url)
    //we gonna use promise here
    .then(response => {
        //the data from url is stored in html 

        const html = response.data
        //cheerio use load to go through the html variable and here this is saved as 
        const $ = cheerio.load(html)
        const articles = []
        $('.fc-item__title', html).each(function () {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })

        })

        console.log(articles)
    }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))