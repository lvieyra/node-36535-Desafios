export default class UsersDTO {
  constructor(user) {
    this.id = user.id;
    this.nombre_apellido = `${user.nombre} ${user.apellido}`;
    this.empresa = user.empresa;
    this.puesto = user.puesto;
  }
}
