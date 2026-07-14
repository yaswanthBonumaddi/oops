// Compile-time polymorphism (method overloading) is not natively supported in JavaScript.
// We simulate it by checking the number and type of arguments.

class Calculator {
    // Simulated method overloading using argument count
    add(...args) {
        if (args.length === 2) {
            return args[0] + args[1];
        } else if (args.length === 3) {
            return args[0] + args[1] + args[2];
        } else {
            throw new Error("Unsupported number of arguments");
        }
    }
}

const calc = new Calculator();
console.log("Sum (2 args): " + calc.add(10, 20));
console.log("Sum (3 args): " + calc.add(10, 20, 30));
