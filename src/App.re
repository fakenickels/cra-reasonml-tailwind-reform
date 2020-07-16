open BsReform;

module StateLenses = [%lenses
  type state = {
    name: string,
    age: int,
    isPEP: bool,
  }
];

module MyForm = ReForm.Make(StateLenses);

[@react.component]
let make = () => {
  let reform =
    MyForm.use(
      ~initialState={name: "", age: 0, isPEP: false},
      ~schema=
        MyForm.Validation.Schema([|
          StringNonEmpty(Name),
          IntMin(Age, 18),
          Custom(
            IsPEP,
            values => values.isPEP ? Valid : Error("Nao aceitamos peps"),
          ),
        |]),
      ~onSubmit=
        ({state}) => {
          Js.log(state.values.name);

          None;
        },
      (),
    );

  <MyForm.Provider value=reform>
    <div className=[%tw "p-5"]>
      <p className=[%tw "font-mono"]>
        <MyForm.Field
          field=Name
          render={({handleChange, value, error}) => {
            <>
              <input
                placeholder="nome"
                value
                onChange={event => {
                  let value = ReactEvent.Form.target(event)##value;
                  handleChange(value);
                }}
              />
              {error->Belt.Option.getWithDefault("")->React.string}
            </>
          }}
        />
      </p>
      <p className=[%tw "font-mono"]>
        <input
          placeholder="Age"
          onChange={event => {
            let value = ReactEvent.Form.target(event)##value;
            reform.handleChange(Age, value->int_of_string);
          }}
        />
      </p>
      <p className=[%tw "font-mono"]>
        <input
          placeholder={j|Você é pepe?|j}
          onChange={event => {
            let value = ReactEvent.Form.target(event)##value;
            let finalBool =
              switch (value) {
              | "Y" => true
              | "N" => false
              | _ => false
              };

            reform.handleChange(IsPEP, finalBool);
          }}
        />
      </p>
      <p className=[%tw "font-mono"]>
        reform.state.values.name->React.string
      </p>
      <p className=[%tw "font-mono"]>
        {reform.state.values.isPEP->string_of_bool->React.string}
      </p>
    </div>
  </MyForm.Provider>;
};
