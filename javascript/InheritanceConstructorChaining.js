// Parent class
class Vehicle {
    // Parent class constructor
    constructor(type) {
        this.type = type;
        console.log("Vehicle constructor called.");
    }
}

// Child class
class Car extends Vehicle {
    // Child class constructor
    constructor(type, model) {
        super(type); // Calling parent class constructor
        this.model = model;
        console.log("Car constructor called.");
    }

    displayDetails() {
        console.log("Vehicle Type: " + this.type);
        console.log("Car Model: " + this.model);
    }
}

// Create a Car object
const car1 = new Car("Sedan", "Audi");
car1.displayDetails();
