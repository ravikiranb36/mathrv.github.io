const example_equations = [
  "abs(x)",
  "acos(x)",
  "asin(x)",
  "atan(x)",
  "atan2(x, 3)",
  "ceil(x)",
  "cos(x)",
  "exp(x)",
  "floor(x)",
  "log(x)",
  "max(x, 5)",
  "min(x, 5)",
  "pow(x, 4)",
  "random()",
  "round(x)",
  "sin(x)",
  "sqrt(x)",
  "tan(x)",
  "x**2",
  "2*x**2 + x",
  "sin(x) + cos(x)",
  "log(x) / sqrt(x)",
  "pow(x, 3) - 2*x**2 + 4*x - 1",
  "abs(sin(x)) * sqrt(x)",
  "pow(x, sin(x)) / tan(x)",
  "cos(x) / sin(x)",
  "exp(x) + log(x)",
  "ceil(sqrt(x))",
  "round(pow(x, 2), 2)",
  "pow(x, 4) - 3*pow(x, 3) + 2*x**2 - 5*x + 1",
  "sin(x) * cos(x)",
  "log(2*x)",
  "sqrt(abs(x))",
  "pow(x, 1/3)",
  "atan2(sin(x), cos(x))",
  "abs(x) + 2*sin(x)",
  "exp(-x)",
  "round(sqrt(x), 2)",
  "pow(2, x)",
  "cos(x) / tan(x)",
  "floor(3*x) + ceil(2*x)",
  "pow(x, sin(x)) + pow(x, cos(x))",
  "abs(2*x - 1)",
  "sqrt(pow(x, 3) + 4*x**2 - x)",
  "log(x + 1)",
  "pow(x, 5) - pow(x, 4) + pow(x, 3) - pow(x, 2) + x - 1",
  "abs(x**2 - 3*x + 2)",
  "exp(2*x) - exp(x)",
  "sin(x) / cos(x)",
  "round(1 / x, 3)",
  "sqrt(2*x + 1) + pow(x, 2)",
  "pow(x, 2*x) - pow(x, sin(x))",
  "sin(x)**2 + cos(x)**2",
  "log(1 + pow(x, 2))",
  "pow(x, 3) - 3*pow(x, 2) + 3*x - 1",
  "abs(x) / 2 + 3*sin(x)",
  "exp(x) - pow(x, 2)",
  "round(sqrt(abs(x)), 2)",
  "pow(x, pow(x, 2))",
  "sin(x) * cos(2*x) + cos(x) * sin(2*x)",
  "log(x) / log(2*x)",
  "ceil(x) / floor(x)",
  "abs(pow(x, 2) - 4) + sqrt(x)",
  "sin(x) * cos(x) + sin(2*x) * cos(2*x)",
  "x * (1 - x)",
  "sin(x) + sin(2*x)",
  "cos(x) + cos(2*x)",
  "0.5 * sin(x) + 0.25 * sin(2*x)",
  "sin(x) * cos(x)",
  "sin(2*x) + 0.5 * sin(3*x)",
  "cos(2*x) + 0.5 * cos(3*x)",
  "sin(x**3) ** cos(x**0.1)",
]

$(document).ready(function () {
  $("#display_examples").click((event) => {
    const btn = event.target;
    if ($(btn).text() === "More") {
      add_examples("more");
      $(btn).text("Less");
    } else {
      $(btn).text("More");
      add_examples();
    }
  });

  $("#visualuze-btn").click(function () {
    console.log("Visualize clicked");
    const plot_err_ele = $("#plot-error");
    plot_err_ele.html("");
    plot_err_ele.addClass("visually-hidden");
    try {

      let constants_text = $("#constants").val().trim();
      let variable_text = $("#variable").val().trim();
      let equation = $("#equation").val().trim();

      let constants_regex = /(\w+)\s*=\s*(\d+)/gim;
      let constants = [];
      let constant;
      while (constant = constants_regex.exec(constants_text)) {
        constants.push([constant[1], constant[2]]);
      }
      constants.forEach((element) => {
        eval(element[0] + "=" + element[1]);
      });
      let x_values = [];
      let y_values = []
      if (variable_text.startsWith("range")) {
        // If range function used in x values
        let range_args_regex = /[+-]?\d+(\.\d+)?/g;
        let range_args = [];
        let arg;
        while (arg = range_args_regex.exec(variable_text)) {
          range_args.push(parseFloat(arg[0]));
        }
        range_args = range_args.slice(0, 3);
        x_values = eval("get_range_values(" + range_args.join(", ") + ")");
      } else {
        // If values given
        let x_value;
        const x_values_regex = /[+-]?\d+(\.\d+)?/g;
        while (x_value = x_values_regex.exec(variable_text)) {
          x_values.push(parseFloat(x_value[0]));
        }
      }
      equation = replace_math_functions(equation);

      x_values.forEach((element) => {
        const x = element;
        y_values.push(eval(equation));
      });
      plot_graph(x_values, y_values); // Plot graph
    } catch (e) {
      console.log(e);
      plot_err_ele.html(e);
      plot_err_ele.removeClass("visually-hidden");
    }


  });

  // Add example
  add_examples();

})

function get_range_values(start, end = null, step = 1) {
  let values = [];
  if (end === null) {
    values = Array.from(Array(start).keys());
  } else {
    for (let i = start; i < end;) {
      values.push(i);
      i += step;
    }

  }
  return values;
}

function replace_math_functions(equation) {
  const math_functions = ['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max',
    'min', 'pow', 'random', 'round', 'sin', 'sqrt', 'tan'];
  math_functions.forEach((math_function) => {
    const regexObj = new RegExp(`(?<!Math\\.)${math_function}\s*\\(`, "g");
    equation = equation.replace(regexObj, `Math.${math_function}\(`)
  });
  return equation;
}

function plot_graph(x_values, y_values, div_id = 'eqplot') {
  var data = [
    {
      x: x_values,
      y: y_values,
      type: "scatter"
    }
  ]
  var layout = {
    uirevision: true,
  };

  Plotly.newPlot(div_id, data, layout);
}

function plot_example_equation(equation, div_id) {
  const x_values = get_range_values(0, 10, 0.01);
  let y_values = [];
  equation = replace_math_functions(equation);

  x_values.forEach((element) => {
    const x = element;
    y_values.push(eval(equation));
  });
  // console.log("plot graph", x_values, y_values);
  $(`#${div_id}`).removeClass("visually-hidden");
  plot_graph(x_values, y_values, div_id); // Plot graph


}

function add_examples(count = "less") {
  console.log("Adding examples");
  let equations = [];
  if (count === "less") {
    equations = example_equations.slice(0, 10);
  } else {
    equations = example_equations;
  }
  let examples_div = $("#examples");
  examples_div.empty();
  // Create a list element.
  var list = $('<ol>');
  // Add the list items to the list element.
  equations.forEach((equation, index) => {
    const list_item = $("<li class='border border-primary mt-2 mb-2 list-group-item bg-light rounded-2'>");
    const link_item = $("<span class='fw-bold'>");
    link_item.text(equation);
    list_item.append(link_item);
    const try_it_btn = $("<button type='button' class='btn btn-sm btn-primary fw-bold p-0 col-sm-1' style='float: right;'>");
    try_it_btn.text("Visualize");
    try_it_btn.click((event) => {
      const target_button = $(event.target);
      const target_btn_text = target_button.text();
      console.log(target_btn_text);
      if (target_btn_text === "Hide") {
        target_button.text("Visualize");
        $(target_button.parent().find("div")[0]).empty();
        return;

      } else {
        target_button.text("Hide");
      }
      plot_example_equation(equation, `example${index}`);
    });

    list_item.append(try_it_btn);
    const plot_div = $(`<div id="example${index}" class="visually-hidden">`);
    list_item.append(plot_div);
    list.append(list_item);
  });
  examples_div.append(list);
}
