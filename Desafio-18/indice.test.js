import assert from 'node:assert'

import chai from 'chai';

import chaiHttp from 'chai-http';
import { get } from 'node:http';

let should = chai.should();

chai.use(chaiHttp);

let expect = chai.expect;

const url= 'http://localhost:3000';
const data = {
    nombre: "Nombre nuevo",
    apellido: "Apellido nuevo",
    empresa: "Empresa nuevo",
    puesto: "Puesto nuevo"
}
const dataUpdated = {
    nombre: "Nombre modificado",
    apellido: "Apellido modificado",
    empresa: "Telecom",
    puesto: "Puesto nuevo"
}
let userId
describe('Estado del request al solicitar de usuarios',() => {

    it('Mostrar todos los usuarios ', (done) => {

        chai.request(url)

        .get('/users')

        .end( (err,res) => {

            res.should.have.status(200);
            done();

        });

    });
    it("Mostrar get de usuario por id",  (done) => {
        chai.request(url).get(`/users/${userId}`)
        .end( (err,res) => {

            res.should.have.status(200);

            done();

        });
    });
    it('Mostrar creación de usuario', (done) => {
        chai.request(url)
        .post('/users')
        .send(data)
        .end( (err,res) => {
            res.should.have.status(200);
             userId=res.body.users._id
           
            done();
        });
    })

    it('Mostrar actualización de usuario', (done) => {
        chai.request(url)
        .put(`/users/${userId}`)
        .send(dataUpdated)
        .end( (err,res) => {
            res.should.have.status(200);
            done();
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    })
        it('Mostrar eliminación de usuario', (done) => {
            chai.request(url)
            .delete(`/users/${userId}`)
            .end( (err,res) => {
                res.should.have.status(200);
                
                done();
            });
        });
});