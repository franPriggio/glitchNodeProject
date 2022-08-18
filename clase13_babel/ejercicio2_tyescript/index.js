var exampleClass = /** @class */ (function () {
    function exampleClass() {
    }
    exampleClass.prototype.getRandomColor = function () {
        var randomNumber = function () { return Math.floor(Math.random() * 256); };
        return "rgb(".concat(randomNumber(), ",").concat(randomNumber(), ",").concat(randomNumber(), ")");
    };
    return exampleClass;
}());
