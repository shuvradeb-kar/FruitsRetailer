FruitsRetailerApp.filter('getByAccountNumber', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (+input[i].AccountNumber == +id) {
                return input[i];
            }
        }
        return null;
    }
});