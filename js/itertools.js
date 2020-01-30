function zip(...arrays) {
    // e.g. zip([[1,2,3],[4,5,6]]) --> [[1,4],[2,5],[3,6]]
    return arrays[0].map(function (_, i) {
        return arrays.map(function (array) { return array[i] })
    });
}

function all(array) {
    return array.reduce(function (a, b) { return a && !!b }, true)
}

Array.prototype.all = all
Array.prototype.zip = zip