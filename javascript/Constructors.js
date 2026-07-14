// Class with constructor
class Car {
    // Constructor
    constructor(model, year) {
        this.model = model;
        this.year = year;
    }

    displayDetails() {
        console.log("Car Model: " + this.model);
        console.log("Car Year: " + this.year);
    }
}

// Create an object using the constructor
const car1 = new Car("Tesla", 2022);
car1.displayDetails();
