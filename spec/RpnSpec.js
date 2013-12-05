describe("Postfix Calculator", function () {
  var calculator;
  var val;
  beforeEach(function () {
    val = 0;
    calculator = new Rpn();
  });

  describe("basic operations", function () {
    it("should be able to calculate a simple addition", function () {
      val = calculator.calculate("1 2 +");
      expect(val).toBe(3);
    });
    it("should be able to calculate a simple subtraction", function () {
      val = calculator.calculate("1 2 -");
      expect(val).toBe(-1);
    });
    it("should be able to calculate a simple multiplication", function () {
      val = calculator.calculate("1 2 *");
      expect(val).toBe(2);
    });
    it("should be able to calculate a simple division", function () {
      val = calculator.calculate("1 2 /");
      expect(val).toBe(0.5);
    });
  });
  
  describe("postfix operations", function() {
    it("should be able to handle a nested calculation", function () {
      val = calculator.calculate("1 2 + 4 *"); // ie 4*(1+2)
      expect(val).toBe(12);
    });
    it("should be able to handle a more deeply nested calculation", function () {
      val = calculator.calculate("5 1 2 + 4 * + 3 -");
      expect(val).toBe(14);
    });
  });
  
  describe("checking for valid input", function () {
    it("should reject too few arguments", function () {
      val = calculator.calculate("1 2 3 +");
      expect(val).toBe("Too few arguments.");
    });
    
    it("should reject input that lacks operators", function () {
      val = calculator.calculate("1 2 3");
      expect(val).toBe("Missing operator(s).");
    });
  
    it("should reject alphabet characters in the input", function () {
      val = calculator.calculate("1 a 3 + z");
      expect(val).toBe("Invalid input.");
      
      val = calculator.calculate("1 Z 3 + A");
      expect(val).toBe("Invalid input.");
    });
    it("should reject other symbols in the input", function () {
      val = calculator.calculate("1 ) 3 + $");
      expect(val).toBe("Invalid input.");
      
      val = calculator.calculate("1 @ 3 + #");
      expect(val).toBe("Invalid input.");
    });
  });

});