const express = require('express')
const app = express ()
const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://Localhost/the_acme_flavors_db')
app.use (require('morgan')('dev'))
app.use (express.json())

const port = 3000

const init = async()=>{
    try {
        const SQL =`
        DROP TABLE IF EXISTS flavors;
    CREATE TABLE flavors(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    is_favorite BOOLEAN DEFAULT False
    icecream VARCHAR(255) NOT NULL
    );
    INSERT INTO flavors(icecream, is_favorite) VALUES('learn express', 5);
    INSERT INTO flavors(icecream, is_faovite VALUES('write SQL queries', 4);
    INSERT INTO flavors(icecream, is_favorite) VALUES('create routes', 2);`
        
        const response = await client.query(SQL)
        app.listen(port,()=>{
            console.log.apply("the server is running")
        })
    }catch(err){
            console.log(err)
        }
    }



app.use(express.json());
app.use(require('morgan')('dev'));
app.post('/api/flavors', async (req, res, next) => {
    try{
        const SQL =`
        UPDATE flavors
        SET txt=$1, ranking=$2, upated_at=now()
        WHERE id=$3 RETURNING *`
        
        const response = client.querry(SQL)}
        catch(err){
            next(err)
        
    }
});
app.get('/api/flavors', async (req, res, next) => {    try{
    const SQL =`SELECT * from flavors 
    ORDER BY created_at DESC;`
    const response = client.querry(SQL)
    res.send(response.rows)}
    catch(err){
        next(err)
    
}});
app.put('/api/flavors/:id', async (req, res, next) => {    try{
    const SQL =`
    UPDATE flavors
    SET text=$1, ranking=$2,updated_at=now()
    WHERE id = $3
    RETURN *`
    
    const response = client.querry(SQL)
    res.send(response.rows[0])
} catch(err){
        next(err)
    
}});
app.delete('/api/flavors/:id', async (req, res, next) => {    try{
    const SQL =`
    DELETE from flavors 
    WHERE ID = $1;
    `
    const response = client.querry(SQL)
    res.send({status:204, message:"successfully Deleted"})
}
    catch(err){
        next(err)
    
}});



init ()