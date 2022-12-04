function CreateAccount() {
  const [update, setUpdate] = React.useState(true);
  const ctx = React.useContext(UserContext);

  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  function handle(){
    console.log(value.name,value.email,value.password);
    const url = `/account/create/${value.name}/${value.email}/${value.password}`;
    (async () =>{
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }

  const [error, setError] = React.useState({});
  const validation = (value) => {
    let error = {};
    if (!value.name.match(/^[a-zA-Z]/)) {
      error.name = "Numbers not accepted!";
    }
    if (!value.name) {
      error.name = "Name is required!";
    }
    if (!value.email) {
      error.email = "Email is required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      error.email = "Email is invalid!";
    }
    if (!value.password) {
      error.password = "Password is required!";
    } else if (value.password.length < 6) {
      error.password = "Password must be more than six character!";
    }
    return error;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validation(value));
  };

  const submit = () => {
    if (!value.name.match(/^[a-zA-Z]/)) return;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) return;
    if (value.password.length < 6) return;
    alert("Account Successfully Created");
    ctx.users.push({
      name: value.name,
      email: value.email,
      password: value.password,
      balance: 0
    });
    setUpdate(false);
    handle();
  };

  function pageRefresh() {
    setValue("");
    setUpdate(true);
  }

  return (
    <>
      <div class="container">
        {update ? (
          <>
            <div id="card">
              <div class="shadow-lg p-3 mb-5 bg-body rounded">
              <div class="card-header" id="head">
            <h1>Create User Account</h1>
          </div>
                <div class="card-body">
                  <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Name</label>
                      <input
                        type="type"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="name"
                        placeholder="Enter Your Name"
                        value={value.name}
                        onChange={handleChange}
                      />
                      {error.name && <p className="error">{error.name}</p>}
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        placeholder="Enter Your Email"
                        value={value.email}
                        onChange={handleChange}
                      />
                      {error.email && <p className="error">{error.email}</p>}
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        placeholder="Enter Password"
                        value={value.password}
                        onChange={handleChange}
                      />
                      {error.password && (
                        <p className="error">{error.password}</p>
                      )}
                    </div>
                    <button
                      class="btn btn-primary"
                      type="submit"
                      onClick={submit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h5>Successfully Account Created</h5>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={pageRefresh}
            >
              Add another account
            </button>
          </>
        )}
      </div>
    </>
  );
}
