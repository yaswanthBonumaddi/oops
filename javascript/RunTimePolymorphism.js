// Parent class
class Animal {
    sound() {
        console.log("Animal makes sound");
    }
}

// Child class
class Dog extends Animal {
    // Method overriding (Runtime Polymorphism)
    sound() {
        console.log("Dog barks");
    }
}

const myAnimal = new Animal(); // Animal reference, Animal object
const myDog = new Dog();       // Dog object (referenced as Animal in Java — not needed in JS)

myAnimal.sound(); // Calls Animal's method
myDog.sound();    // Calls Dog's overridden method (Run-time Polymorphism)
