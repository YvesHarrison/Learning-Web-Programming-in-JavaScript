const volumeOfRectangularPrism=function volumeOfRectangularPrism(length, width, height) {
    if (width==undefined) {
        throw "Parameter width is not provided!";
    }
    if (height==undefined) {
        throw "Parameter height is not provided!";
    }
    if (length==undefined) {
        throw "Parameter length is not provided!";
    }
    if (isNaN(width)) {
        throw "Parameter width is not a number!";
    }
    if (isNaN(height)) {
        throw "Parameter height is not a number!";
    }
    if (isNaN(length)) {
        throw "Parameter length is not a number!";
    }
    if (width<=0) {
        throw "Parameter width is not within proper bounds!";
    }
    if (height<=0) {
        throw "Parameter height is not within proper bounds!";
    }
    if (length<=0) {
        throw "Parameter length is not within proper bounds!";
    }
    return length*width*height;
}

const surfaceAreaOfRectangularPrism=function surfaceAreaOfRectangularPrism(length, width, height){ 
    if (width==undefined) {
        throw "Parameter width is not provided!";
    }
    if (height==undefined) {
        throw "Parameter height is not provided!";
    }
    if (length==undefined) {
        throw "Parameter length is not provided!";
    }
    if (isNaN(width)) {
        throw "Parameter width is not a number!";
    }
    if (isNaN(height)) {
        throw "Parameter height is not a number!";
    }
    if (isNaN(length)) {
        throw "Parameter length is not a number!";
    }
    if (width<=0) {
        throw "Parameter width is not within proper bounds!";
    }
    if (height<=0) {
        throw "Parameter height is not within proper bounds!";
    }
    if (length<=0) {
        throw "Parameter length is not within proper bounds!";
    }
    return 2*(length*height+width*height+length*width);
}

const volumeOfSphere=function volumeOfSphere(radius) {
    if (radius==undefined) {
        throw "Parameter radius is not provided!";
    }
    if (isNaN(radius)) {
        throw "Parameter radius is not a number!";
    }
    if (radius<=0) {
        throw "Parameter radius is not within proper bounds!";
    }
    return 4.0/3.0*radius*radius*radius*Math.PI;
}

const surfaceAreaOfSphere=function surfaceAreaOfSphere(radius) {
    if (radius==undefined) {
        throw "Parameter radius is not provided!";
    }
    if (isNaN(radius)) {
        throw "Parameter radius is not a number!";
    }
    if (radius<=0) {
        throw "Parameter radius is not within proper bounds!";
    }
    return 4*radius*radius*Math.PI;
}

module.exports = {
    description: "This is a geometry.js for CS-546 lab2",
    firstName: "Xinzhe", 
    lastName: "Li", 
    studentId: "10434405",
    volumeOfRectangularPrism,
    surfaceAreaOfRectangularPrism,
    volumeOfSphere,
    surfaceAreaOfSphere
};

// console.log(volumeOfRectangularPrism(1,2,3));
// console.log(surfaceAreaOfRectangularPrism(1,2,3));
// console.log(volumeOfSphere(1));
// console.log(volumeOfSphere());
// console.log(surfaceAreaOfSphere(1));