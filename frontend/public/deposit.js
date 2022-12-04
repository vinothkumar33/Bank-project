function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div>
      {show ?
        <DepositForm setShow={setShow} setStatus={setStatus} /> :
        <DepositMsg setShow={setShow} setStatus={setStatus} />}
    </div>
  )
}

function DepositMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Deposit again
    </button>
  </>);
}

function DepositForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle() {
    fetch(`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.value));
          props.setShow(false);
          console.log('JSON:', data);
          alert(`Deposit Successfull ${amount}`)
        } catch (err) {
          props.setStatus('Deposit failed')
          console.log('err:', text);
          alert("User not found or deposit failed")
        }
      });
  }

  return (<>
    <div  id="card">
      <div class="shadow-lg p-3 mb-5 bg-body rounded">
      <div class="card-header" id="head">
            <h1>Deposit in your Account</h1>
          </div>
        <div class="card-body">
          Email<br />
          <input type="input"
            className="form-control"
            placeholder="Enter email"
            value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />

          Amount<br />
          <input type="number"
            className="form-control"
            placeholder="Enter amount"
            name="password"
            value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br />

          <button type="submit"
           class="btn btn-primary"
            onClick={handle}>Deposit</button>
        </div>
      </div>
    </div>
  </>);
}


