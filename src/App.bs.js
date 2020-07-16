// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var ReForm$BsReform = require("bs-reform/src/ReForm.bs.js");

function get(state, field) {
  switch (field) {
    case /* Name */0 :
        return state.name;
    case /* Age */1 :
        return state.age;
    case /* IsPEP */2 :
        return state.isPEP;
    
  }
}

function set(state, field, value) {
  switch (field) {
    case /* Name */0 :
        return {
                name: value,
                age: state.age,
                isPEP: state.isPEP
              };
    case /* Age */1 :
        return {
                name: state.name,
                age: value,
                isPEP: state.isPEP
              };
    case /* IsPEP */2 :
        return {
                name: state.name,
                age: state.age,
                isPEP: value
              };
    
  }
}

var StateLenses = {
  get: get,
  set: set
};

var MyForm = ReForm$BsReform.Make({
      set: set,
      get: get
    });

function App(Props) {
  var reform = Curry._7(MyForm.use, {
        name: "",
        age: 0,
        isPEP: false
      }, /* Schema */[[
          /* StringNonEmpty */Block.__(2, [/* Name */0]),
          /* IntMin */Block.__(6, [
              /* Age */1,
              18
            ]),
          /* Custom */Block.__(10, [
              /* IsPEP */2,
              (function (values) {
                  if (values.isPEP) {
                    return /* Valid */0;
                  } else {
                    return /* Error */["Nao aceitamos peps"];
                  }
                })
            ])
        ]], (function (param) {
          console.log(param.state.values.name);
          
        }), undefined, undefined, undefined, undefined);
  return React.createElement(MyForm.Provider.make, Curry._3(MyForm.Provider.makeProps, reform, React.createElement("div", {
                      className: "p-5"
                    }, React.createElement("p", {
                          className: "font-mono"
                        }, React.createElement(MyForm.Field.make, {
                              field: /* Name */0,
                              render: (function (param) {
                                  var handleChange = param.handleChange;
                                  return React.createElement(React.Fragment, undefined, React.createElement("input", {
                                                  placeholder: "nome",
                                                  value: param.value,
                                                  onChange: (function ($$event) {
                                                      return Curry._1(handleChange, $$event.target.value);
                                                    })
                                                }), Belt_Option.getWithDefault(param.error, ""));
                                })
                            })), React.createElement("p", {
                          className: "font-mono"
                        }, React.createElement("input", {
                              placeholder: "Age",
                              onChange: (function ($$event) {
                                  var value = $$event.target.value;
                                  return Curry._2(reform.handleChange, /* Age */1, Caml_format.caml_int_of_string(value));
                                })
                            })), React.createElement("p", {
                          className: "font-mono"
                        }, React.createElement("input", {
                              placeholder: "Você é pepe?",
                              onChange: (function ($$event) {
                                  var value = $$event.target.value;
                                  var finalBool;
                                  switch (value) {
                                    case "N" :
                                        finalBool = false;
                                        break;
                                    case "Y" :
                                        finalBool = true;
                                        break;
                                    default:
                                      finalBool = false;
                                  }
                                  return Curry._2(reform.handleChange, /* IsPEP */2, finalBool);
                                })
                            })), React.createElement("p", {
                          className: "font-mono"
                        }, reform.state.values.name), React.createElement("p", {
                          className: "font-mono"
                        }, Pervasives.string_of_bool(reform.state.values.isPEP))), undefined));
}

var make = App;

exports.StateLenses = StateLenses;
exports.MyForm = MyForm;
exports.make = make;
/* MyForm Not a pure module */
