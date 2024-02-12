import CreditCard from './credit-card/CreditCard';
import type { Cards } from './credit-card/CreditCard';

const apiPostCall = (values: Cards): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      resolve();
    }, 1000);
  });
};

const App = () => {
  return (
    <div className="App">
      <CreditCard handleSubmit={apiPostCall} />
    </div>
  );
};

export default App;
