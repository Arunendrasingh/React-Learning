import { useState } from "react";
import "./index.css";

export default function App() {
  // Create a state for order list from here and pass them as props down the component.
  console.log("Rendering App component.");
  const [itemList, setItemList] = useState([]);
  const updateItemList = (newItem) => {
    setItemList(() => [...itemList, newItem]);
  };

  // Use Effect
  return (
    <div>
      <Logo />
      <Form setItem={updateItemList} />
      <OrderList itemList={itemList} modifyItemList={setItemList} />
      <State />
    </div>
  );
}

// UI logo
function Logo() {
  console.log("Rendering Logo component.");

  return <h1>⛵ Far Away 🧳</h1>;
}

// Form to add list
function Form({ setItem }) {
  console.log("Rendering Form component.");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    setItem(newItem);
  };
  return (
    <div className="add-form">
      What do you need for you Trip 😍
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Insert item name to Add."
          value={description}
          onChange={(e) => setDescription(() => e.target.value)}
        />
        <select
          value={quantity}
          onChange={(e) => setQuantity(() => Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, index) => index + 1).map((index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
        <button>Add List</button>
      </form>
    </div>
  );
}

// Order list.
function OrderList({ itemList, modifyItemList }) {
  // modifyItemList: it is setmethod of useState hooks to update the item-state.
  console.log("Rendering OrderList component.");
  const removeItem = (itemId) => {
    // function to remove the item.
    let new_item_array = itemList.filter((item) => {
      if (item.id !== itemId) {
        return true;
      } else {
        return false;
      }
    });

    modifyItemList(() => new_item_array);

    console.log("New Item list after deleting an item.: ", new_item_array);
  };

  const updatePacked = (itemId, packed_status) => {
    console.log("Update packed is clicked and id is: ", itemId);
    let updated_array = itemList.map((item) => {
      if (item.id === itemId) {
        item.packed = packed_status;
      }
      return item;
    });
    modifyItemList(() => updated_array);
  };

  return (
    <ul className="list">
      {itemList.map((item) => (
        <li>
          <input
            type="checkbox"
            onChange={() => updatePacked(item.id, !item.packed)}
          />
          <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            {item.description} -- {item.quantity}
          </span>
          <button onClick={() => removeItem(item.id)}>☠️</button>
        </li>
      ))}
    </ul>
  );
}

// State...
function State() {
  return (
    <footer className="stats">
      You have xx items in your list, and you already packed xx package.
    </footer>
  );
}
