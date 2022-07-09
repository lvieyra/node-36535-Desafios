db = connect( 'mongodb://localhost/ecommerce' );


db.createCollection("productos");
db.createCollection("mensajes");
db.productos.insertMany([
    {nombre:"Reloj",precio:120,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-19-128.png"},
    {nombre:"Ojotas",precio:580,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-12-128.png"},
    {nombre:"Cortapluma",precio:900,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-09-128.png"},
    {nombre:"Brujula",precio:1280,foto:"httpshttps://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-07-128.png"},
    {nombre:"Anteojos",precio:1700,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-06-128.png"},
    {nombre:"Agenda",precio:2300,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-13-128.png"},
    {nombre:"Peine",precio:2860,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-02-128.png"},
    {nombre:"Valija",precio:3350,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-16-128.png"},
    {nombre:"Billetera",precio:4320,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-18-128.png"},
    {nombre:"Libro",precio:4990,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-17-128.png"},
])
db.mensajes.insertMany([
    {usermail:"mlucero@gmail.com.ar",fecha:ISODate(),mensaje:"Hola como estas?"},
    {usermail:"calvarez@gmail.com.ar",fecha:ISODate(),mensaje:"Bien y vos??"},
    {usermail:"pgatti@gmail.com.ar",fecha:ISODate(),mensaje:"la Flia"},
    {usermail:"ncabrera@gmail.com.ar",fecha:ISODate(),mensaje:"todo bien?"},
    {usermail:"rperez@gmail.com.ar",fecha:ISODate(),mensaje:"donde van de vacaciones"},
    {usermail:"erosales@gmail.com.ar",fecha:ISODate(),mensaje:"al Caribe"},
    {usermail:"lfernandez@gmail.com.ar",fecha:ISODate(),mensaje:"y uds"},
    {usermail:"etevez@gmail.com.ar",fecha:ISODate(),mensaje:"en casa"},
    {usermail:"usesmilo@gmail.com.ar",fecha:ISODate(),mensaje:"trabajando"},
    {usermail:"dorozco@gmail.com.ar",fecha:ISODate(),mensaje:"que difruten"},
])


print("\nColección productos:\n")
printjson(db.productos.find());
print("Colección mensajes:\n")
printjson(db.mensajes.find());


print(`Cantidad de productos: ${db.productos.estimatedDocumentCount()}`);
print(`Cantidad de mensajes: ${db.productos.estimatedDocumentCount()}`);


db.productos.insertOne({nombre:"Camara",precio:4100,foto:"https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-128.png"});



db.productos.find({"precio":{$lt:1000}},{"nombre":1});


db.productos.find({"precio":{$gte:1000,$lte:3000}},{"nombre":1});


db.productos.find({"precio":{$gt:3000}},{"nombre":1});


db.productos.find().skip(2).limit(1).sort({"precio": 1})


db.productos.updateMany({},{$set:{"stock":100}});


db.productos.updateMany({"precio":{$gt:4000}},{$set:{"stock":0}});


db.productos.deleteMany({"precio":{$lt:1000}});


db = connect( 'mongodb://localhost/admin' );

db.createUser(
    {
        user: "pepe",
        pwd:"asd456",
        roles:[
            {role:"read",db:"ecommerce"}
        ]
    }
);