function echo(str, num){

    for(var i = 0; i < num; i++){
        console.log(str);
    }

}

echo("Echo!!!", 10);
echo("Tater tots", 3);

function average(arr){

    var total = null;
    for(var i = 0; i < arr.length; i++){

         total += arr[i];
    }

    var average = Math.round(total / arr.length);

    return average;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);
