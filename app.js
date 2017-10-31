var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg')

const app = express()

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



var config = {
    user: 'cakes',
    password: 'zertgh5678',
    database: 'postgres',
    max: 10,
    idleTimeoutMillis: 30000 
}

var pool = new pg.Pool(config)
var meuCliente

app.get('/', function(req,res){
    pool.connect(function(err, client, done){
        if(err){
            console.log(err)
        }
        meuCliente = client
        var receitasQuery = ('SELECT * from public.receitas')
        meuCliente.query(receitasQuery, function(err, result){
            if(err){
                console.log(err)
            }
            res.render('index', {receitas: result.rows});
            done();
        })  
    })
})

app.post('/add', function(req,res){
    pool.connect(function(err, client, done){
        if(err){
            console.log(err);
        }
        meuCliente = client;
        meuCliente.query("INSERT INTO public.receitas(nome, ingredientes, dir) VALUES($1, $2, $3)",[req.body.nome, req.body.ingredientes, req.body.dir]);
        done();
            res.redirect('/');
            
    });
});

app.delete('/delete/:id', function(req, res){
    pool.connect(function(err, client, done){
        if(err){
            console.log(err);
        }
        meuCliente = client;
        meuCliente.query("DELETE FROM public.receitas WHERE id = $1", [req.params.id]);
        done();
        res.status(200).send('Delete feito com sucesso');
    });
});

app.listen(3000, function(){
            console.log("Servidor conectado na porta 3000")
        })