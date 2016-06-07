//input string "You are (looking good) today"
//output: (looking good)
// no reg expressions or str replace
// "(let a 10) (let b (+ 4 5)) (+ (+ a b) 5)"
//  => (+ (+ 10 9) 5) => 24
//first make a hash with premade keys and values, then try using the variables in the expressions
//then practice adding to the hash
//then try everything

debugger;
var expression_finder = function(s) {

    var str = s;
    var str_length = s.length;
    var right_paren;
    var left_paren;
    var variables = {a:2, b:4, c:5};


    if (str.indexOf('let') > -1){
        var variable_value_index = str.indexOf(')'); //8
        var new_string = str.substr(0, variable_value_index);
        variable_finder = new_string.split(' ');
        // console.log(variable_finder);
        for (var i = 0; i < 1; i++){
        variable_finder.splice(0, 1); // ["a", "9"]
        // console.log(variable_finder);
        variables[variable_finder[0]] = parseInt(variable_finder[1]); // pushes key value pair to hash
        // console.log(variables);
    }

    }

  //replace this: loop over the hash instead...look for keys in string, if they exisit replace them
    // var i = 0;
    // while (true){
    //     if (str[i] === "a"){
    //         // var a = variables["a"];
    //         // var a_index = i;
    //         str = str.replace("a", variables["a"]);
    //         i = i + 1;
    //      } else if (str[i] === "b"){
    //         // var b = variables["b"];
    //         // var b_index = i;
    //         str = str.replace("b", variables["b"]);
    //         i = i + 1;
    //      } else {
    //         i = i + 1;
    //      }

    //     if (i === str_length) {
    //         break;
    //     }
    // };

    var i = 0;
    while (true){

            //loop over the variables hash, look for keys in string, if they exisit replace them in the string with their values
    for (key in variables){
            // console.log(key);  // key = a, b, c
            // console.log(variables[key]); // variables[key] = 2, 4, 5
            // console.log(str.indexOf(key));  // 3, 5, -1 (so finds a b but not c)
            if(str.indexOf(key) !== -1 ){
                str = str.replace(key, variables[key]);
            }
        }


        // loop through all characters in string, if character is a (
        if (str[i] === "(" ){
            // get the index of the opening paren
            left_paren = i;
            //increment i by 1
            i = i + 1;
        // else if character is a )
        } else if (str[i] === ")"){
            //get the index of the closing paren
            right_paren = i;
            // return the first and last part of the string with the inner most paren
            var expression_to_evaluate = str.substring(left_paren + 1, right_paren);
            // send the expression to be evaluated to the operate function and store the returned result
            var evaluated_expression = operate(expression_to_evaluate);
            // return the concatenation of the remaining expressions with the evaluated expression
            var result = str.substring(0, left_paren) + evaluated_expression + str.substring(right_paren + 1);
            return result;
        } else {
            i = i + 1;
        }

        if (i === str_length) {
            break;
        }

    }
}

var operate = function(s) {

    // adding the operator and 2 numbers to an array
    var arr = s.split(" ");

    //turning the string numbers into integers
    var a = parseInt(arr[1]);
    var b = parseInt(arr[2]);

    // checking the operator and performing the matching operation and returning the value to the expression finder function
    if (arr[0] === "+") {
        return a + b;
    }else if (arr[0] === "-") {
        return a - b;
    }else if (arr[0] === "/") {
        return a / b;
    }else if (arr[0] === "*") {
        return a * b;
    }else {
        return 0;
    }
}


var test = function() {

        var l = [
        [["(+ 5 + (1 - 5))"], [10]]
        ];

// var x = expression_finder("Y (w (a (l g) h) w) t (s)");
// var x1 = expression_finder("Y (w (a (l (x rfrf) g) h) w) t (s)");
// var x1 = expression_finder("(+ 2 (+ 2 4))");
// var expression = "(+ 2 (+ (- 10 4) (* 3 4)))";
// var expression = "(+ a b)";
var expression = "(let a 9)";
console.log(expression);
var x1 = expression_finder(expression);
console.log(x1);

//loops to resend the result of the expression finder if there are still more expressions to be evaluated, else it stops
while(true){
    if (x1.indexOf("(") !== -1 ){
        x1 = expression_finder(x1);
        console.log(x1);
    }else {
        console.log(x1);
        break;
    }

}

}
test();
