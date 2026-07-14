// Encapsulated class using private fields (#)
class Car {
    #model;
    #year;

    // Getter and Setter methods
    getModel() {
        return this.#model;
    }

    setModel(model) {
        this.#model = model;
    }

    getYear() {
        return this.#year;
    }

    setYear(year) {
        this.#year = year;
    }

    displayDetails() {
        console.log("Car Model: " + this.#model);
        console.log("Car Year: " + this.#year);
    }
}

const car1 = new Car();
car1.setModel("BMW");
car1.setYear(2021);
car1.displayDetails();
