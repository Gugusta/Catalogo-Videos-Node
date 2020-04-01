const express = require('express')
const nunjucks = require('nunjucks')

const server = express ()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get ("/", function(req,res){
    const about = {
        avatar_url: "https://scontent.fssz4-1.fna.fbcdn.net/v/t1.0-9/81372042_2623632174372422_3540091806924406784_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=9YRI5b0y-0cAX8lhhlu&_nc_ht=scontent.fssz4-1.fna&oh=de4c968fcea89f897977993f5a22a565&oe=5EA6EB10",
        name: "Gustavo Serão",
        role: "Estudante de Engenharia",
        description: 'Programador iniciante e estudante Engenharia da Computação na faculdade <a href="https://www.esamc.br/unidade/Santos/" target="_blank">ESAMC - Santos</a>',
        link: [
            { name: "Github", url: "https://github.com/Gugusta" },
            { name: "Twitter", url: "https://twitter.com/Gugusta_" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/gustavo-serao/" }
        ]

    }
    
    return res.render("about", {about})
})

server.get("/portifolio", function (req, res) {
    return res.render("portifolio", {items: videos})
})

server.get("/video",  function(req,res){
    const id = req.query.id

    const video = videos.find(function(video){
        if (video.id == id) {
            return true
        }
    })

    if (!video) {
        return res.send("Video not found!")
    }
    return res.render("video", {item:video})
})

server.listen(5000, function(){
    console.log("Server is running...")
})