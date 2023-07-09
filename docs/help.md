# Usage

## Constants
To use constants in your equation\
Example:
```
a = 3
b = 4
equation = "x**2 + 2*a*x + b"
```
Then add `a = 4` , `b=6` in Constants field

## X-Values
`equation = x**2 + 2*a*x` the provide x values you want plot<br>
Eg: 1 2 3 6 7.  `Space` or `Comma` separated values<br>
If you want to use range of values then,

* 0 to 9: `range(10)`
* 3 to 9: `range(3,10)`
* Custom Steps 2, 3, 5( step=2 now):  `range(2,6,2)

**Syntax**: range(start,end, step)<br>
* `end` and `step` are optional. By default `step=1`

## Equation
You can define upto 1 variable equation

**Note:**<br>
* Variable name should be `x`
* Use `*` for Multiplication Eg: `2 X x` -> `2*x`
* Use `/` for Division Eg: `x/2`
* Use `**` for power
* It supports mathematical functions: `abs`, `acos`, `asin`, `atan`, `atan2`, `ceil`, `cos`, `exp`, `floor`, `log`, `max`, `min`, `pow`, `random`, `round`, `sin`, `sqrt`, `tan`<br>
  Example: `sin(x)` , `cos(x)` etc.

