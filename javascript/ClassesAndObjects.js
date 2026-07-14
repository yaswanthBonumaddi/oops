// Class definition
class Car {
    constructor() {
        this.model = null;
        this.year = null;
    }

    // Method to display car details
    displayDetails() {
        console.log("Car Model: " + this.model);
        console.log("Car Year: " + this.year);
    }
}

// Create an object of the Car class
const car1 = new Car();
car1.model = "Toyota";
car1.year = 2020;

// Calling method on object
car1.displayDetails();
