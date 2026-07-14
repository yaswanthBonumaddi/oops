// JavaScript does not support multiple class inheritance (diamond problem doesn't apply to classes).
// However, we can demonstrate the CONCEPT of the diamond problem using mixins.

// If JavaScript allowed multiple inheritance like below, the diamond problem would arise:
// class HybridCar extends ElectricCar, PetrolCar { ... } // NOT VALID in JS

class Vehicle {
    fuelType() {
        console.log("General vehicle fuel type");
    }
}

class ElectricCar extends Vehicle {
    fuelType() {
        console.log("Electric car runs on electricity");
    }
}

class PetrolCar extends Vehicle {
    fuelType() {
        console.log("Petrol car runs on petrol");
    }
}

// JavaScript only allows single inheritance.
// A class can only extend ONE other class.
// The diamond problem does NOT occur in JavaScript class-based inheritance.
// Uncommenting the next line would be a SyntaxError in JS:
// class HybridCar extends ElectricCar, PetrolCar { } // ❌ SyntaxError

console.log("Diamond problem does NOT exist in JavaScript class inheritance.");
console.log("JavaScript only supports single inheritance for classes.");
console.log("(Mixins / composition can be used to combine behaviours from multiple sources.)");
