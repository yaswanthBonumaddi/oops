// JavaScript does not have interfaces, but we can simulate them using mixins.

// Mixin acting as "interface" USBDevice
const USBDevice = (Base) => class extends Base {
    plugIn() {
        throw new Error("plugIn() must be implemented");
    }
    unplug() {
        throw new Error("unplug() must be implemented");
    }
};

// Unrelated class 1 — Printer implements USBDevice interface
class Printer extends USBDevice(class {}) {
    plugIn() {
        console.log("Printer is plugged into USB port.");
    }

    unplug() {
        console.log("Printer is unplugged from USB port.");
    }

    printDocument() {
        console.log("Printing document...");
    }
}

// Unrelated class 2 — Scanner implements USBDevice interface
class Scanner extends USBDevice(class {}) {
    plugIn() {
        console.log("Scanner is plugged into USB port.");
    }

    unplug() {
        console.log("Scanner is unplugged from USB port.");
    }

    scanDocument() {
        console.log("Scanning document...");
    }
}

// Create objects of unrelated classes
const printer = new Printer();
const scanner = new Scanner();

// Both implement the common "interface"
printer.plugIn();
printer.printDocument();
printer.unplug();

console.log(); // Line break

scanner.plugIn();
scanner.scanDocument();
scanner.unplug();
