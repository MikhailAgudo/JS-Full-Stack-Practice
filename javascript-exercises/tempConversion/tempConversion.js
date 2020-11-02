const ftoc = function(fahrenheit) {
  let output = (fahrenheit - 32) * (5 / 9)
  console.log("round" + Math.round(output));
  let decimal = output % 1;
  output = output - decimal;
  console.log("output " + output + " decimal " + decimal);
  decimal = decimal * 10;
  decimal = Math.round(decimal);
  decimal = decimal / 10;
  return output + decimal;
}

const ctof = function(celsius) {
  let output = (celsius * (9 / 5)) + 32
  let decimal = output % 1;
  output = output - decimal;
  console.log("output " + output + " decimal " + decimal);
  decimal = decimal * 10;
  decimal = Math.round(decimal);
  decimal = decimal / 10;
  return output + decimal;
}

module.exports = {
  ftoc,
  ctof
}
