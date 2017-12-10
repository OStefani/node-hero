function sum(arr) {
    return arr.reduce(function (total, cur) { return total + cur});
}
module.exports.sum = sum;