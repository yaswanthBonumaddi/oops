// Abstract class simulation using a base class with error throwing
class Shape {
    // Simulated abstract method
    draw() {
        throw new Error("Method 'draw()' must be implemented by subclass.");
    }

    // Concrete method
    display() {
        console.log("This is a shape.");
    }
}

// Child class providing implementation of abstract method
class Circle extends Shape {
    draw() {
        console.log("Drawing a circle.");
    }
}

// Cannot instantiate abstract class (by convention — will throw if draw() is called directly on Shape)
// const s = new Shape(); // calling s.draw() would throw an error

// Instantiate concrete class
const circle = new Circle();
circle.draw();    // Calls abstract method's implementation
circle.display(); // Calls concrete method from base class
