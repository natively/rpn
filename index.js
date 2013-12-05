$(function () {
  var postfix = new Rpn();
  var commandLine = $("#commandLine");
  var inputField = $("#commandLineInput");
  
  commandLine.on("submit", function (e) {
    // prevent the form from actually submitting
    e.preventDefault();

    // calculate this:
    var val = inputField.val();
    if (val) {
      var result = postfix.calculate(val);
      var resultClass = "";
      if (isNaN(result)) {
        resultClass = "warning";
      }
      var newTag = "<p class='rounded " + resultClass + "'>" + val + "<strong> => " + result + "</strong></p>";
      $(".results").prepend(newTag);

      // clear the field
      $(this)[0].reset();
    }
  });
});