// class car {
//     #buildNumber;

//     constructor(color, model, buildnumber){
//         this.color = color;
//         this.model = model;
//         this.#buildNumber = buildnumber
//     }

//     displayDetailes(){
//         console.log(this)
//     }

//     show(){
//         console.log(this.#buildNumber)
//     }

//     get test(){
//         console.log(this.#buildNumber + "cccc")
//     }

//     set test1(value){
//          this.#buildNumber = value
//     }
// }

// const car1 = new car("blue","x21","xxxx1234")
// console.log(car1)
// car1.displayDetailes()
// car1.buildNumber = "abc";
// console.log(car1)
// car1.show()

// class Vehicle {
//   constructor(brand, speed) {
//     this.brand = brand;
//     this.speed = speed;
//   }

//   move() {
//     console.log("vechicle is moving");
//   }

//   stop() {
//     console.log("stopped");
//   }
// }

// class Car extends Vehicle {
//   constructor(brand, speed, doors) {
//     super(brand, speed);
//     this.doors = doors;
//   }

//   //   move() {
//   //     console.log("car is moving");
//   //   }

//   sound() {
//     console.log("beep beep");
//   }
// }

// class Batterycar extends Car {
//   constructor(brand, speed, doors, batterylife) {
//     super(brand, speed, doors);
//     this.batterylife = batterylife;
//   }

//   isfull() {
//     console.log("battery full");
//   }
// }

// const myvechical = new Vehicle("generic", 30);
// const mycar = new Car("tayota", 120, 4);
// const mytesla = new Batterycar("tesla", 200, 6);

// mytesla.isfull();
// mycar.move();

// class Dbconnection {
//   constructor(host, port) {
//     if (new.target === Dbconnection) {
//       throw new Error("abstracted");
//     }
//     this.host = host;
//     this.port = port;
//   }

//   connect() {
//     throw new Error("still need to make connect method");
//   }

//   disconnect() {
//     throw new Error("still need to make disconnect method");
//   }
// }

// class MysqlDb extends Dbconnection {
//   connect() {
//     console.log("connecting...");
//   }

//   disconnect() {
//     console.log("disconnecting...");
//   }
// }

// // const c1 = new Dbconnection(2345, 3456);
// const c2 = new MysqlDb(123345, 455345);
// console.log(c2);
// c2.connect();
// c2.disconnect();
