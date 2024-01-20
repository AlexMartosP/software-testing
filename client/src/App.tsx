import { Form } from "./components/Form/Form";
import { List } from "./components/List/List";

function App() {
  return (
    <div className="p-12 flex gap-12">
      <div className="flex-1">
        <h2 className="text-lg">Add product</h2>
        <Form />
      </div>
      <div className="flex-1">
        <h2 className="text-lg">Product list (123.00 kr (total))</h2>
        Test cases: Empty (hasProducts), total amount, currency converter
        <div className="mt-4">
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
