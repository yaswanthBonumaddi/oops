// JavaScript does not have interfaces, but we can simulate them using mixins.
// This demonstrates the "diamond problem solution" equivalent using mixin composition.

// Mixin: Vehicle interface
const VehicleMixin = (Base) => class extends Base {
    fuelType() {
        throw new Error("fuelType() must be implemented");
    }
};

// Mixin: ElectricCar — extends Vehicle behaviour
const ElectricCarMixin = (Base) => class extends VehicleMixin(Base) {
    fuelType() {
        console.log("Electric car runs on electricity");
    }
};

// Mixin: PetrolCar — extends Vehicle behaviour
const PetrolCarMixin = (Base) => class extends VehicleMixin(Base) {
    fuelType() {
        console.log("Petrol car runs on petrol");
    }
};

// HybridCar composes both ElectricCar and PetrolCar mixins
// Override fuelType() to resolve the ambiguity
class HybridCar extends ElectricCarMixin(PetrolCarMixin(class {})) {
    fuelType() {
        console.log("Hybrid car can run on both electricity and petrol");

        // Optionally call specific mixin versions
        ElectricCarMixin(class {}).prototype.fuelType.call(this); // ElectricCar version
        PetrolCarMixin(class {}).prototype.fuelType.call(this);   // PetrolCar version
    }
}

const hybridCar = new HybridCar();
hybridCar.fuelType(); // Resolves the ambiguity and calls HybridCar's version
