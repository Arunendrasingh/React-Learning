import { useState } from "react";
// import { CSSTransFition } from 'react-transition-group';

// Initial data
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// splitt bill default obj
const splitFormObj = {
  total_amount: 0,
  your_expense: 0,
  friend_expense: 0,
  bill_payed_by: "",
};

function EatNSplit() {
  // Initial-Friend state
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isForm, setIsForm] = useState(0);
  const addFriend = (frinedObj) => {
    setFriendList(() => [...friendList, frinedObj]);
  };
  // Add friend Form state
  const toggleFriendForm = () => {
    setIsForm(!isForm);
  };
  // Set the seleted friend.
  const handleSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => {
      return cur?.id === friend?.id ? null : friend;
    });
  };

  const splitBill = (bill_detail) => {
    console.log(bill_detail);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Bill Splitter App</h1>
      <div className="app" style={{ padding: "10px" }}>
        <div className="sidebar">
          <FriendList
            friendList={friendList}
            handleSelection={handleSelection}
          />
          {!isForm ? (
            <button className="button" onClick={toggleFriendForm}>
              Add New Friend
            </button>
          ) : (
            <AddFriendForm
              isForm={isForm}
              toggleForm={toggleFriendForm}
              addNewFriend={addFriend}
            />
          )}
        </div>
        <div className="sidebar">
          {selectedFriend && (
            <SplittBillForm
              selectedFriend={selectedFriend}
              splitBill={splitBill}
            />
          )}
        </div>
      </div>
    </>
  );
}

function AddFriendForm({ isForm, toggleForm, addNewFriend }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // saving the obj
    let new_obj = { id: Date.now(), name, image: img, balance: 0 };
    addNewFriend(new_obj);
    setName("");
  };
  return (
    <>
      {isForm && (
        <>
          <form className="form form-add-friend" onSubmit={handleFormSubmit}>
            <label htmlFor="freind-name">🧑‍🤝‍🧑 Friend Name</label>
            <input
              type="text"
              placeholder="Enter Friend Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="freind-image">🖼️ Image URL</label>
            <input
              type="text"
              placeholder="Enter Friend Name"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <button className="button">Add Freind</button>
          </form>
          <button className="button" onClick={toggleForm}>
            Close
          </button>
        </>
      )}
    </>
  );
}

// Add Expese form
function SplittBillForm({ selectedFriend, splitBill }) {
  const [form, setForm] = useState(splitFormObj);
  const handleSplittBillForm = (e) => {
    e.preventDefault();
    console.log("Submitting the form with value: ", form);
    // validate expense data
    if (
      Number(form.total_amount) !==
      Number(form.your_expense) + Number(form.friend_expense)
    ) {
      console.log("Expense must equal to total amount");
    }
  };

  const autoFillFormExpense = (
    currentFieldName,
    fieldToUpdate,
    calculateFromField,
    value
  ) => {
    let newFormObj = { ...form };
    let total_amount = Number(newFormObj[calculateFromField]);
    if (total_amount <= 0) {
      newFormObj[calculateFromField] = value;
      total_amount = Number(newFormObj[calculateFromField]);
    } else if (total_amount < Number(value)) {
      alert("Expense value is greater than total amount.");
      setForm({ ...form });
      return;
    }

    let calculated_value = total_amount - Number(value);

    newFormObj[fieldToUpdate] = Number(calculated_value);
    newFormObj[currentFieldName] = Number(value);

    setForm(newFormObj);
  };
  return (
    <>
      <form className="form form-split-bill" onSubmit={handleSplittBillForm}>
        <h2>Split bill with {selectedFriend.name}.</h2>
        <label htmlFor="bill-value">💰 Bill Vlaue</label>
        <input
          type="number"
          value={form.total_amount}
          onChange={(e) => {
            setForm({ ...form, total_amount: Number(e.target.value) });
            // autoFillFormExpense(
            //   "total_amount",
            //   "friend_expense",
            //   "your_expense",
            //   e.target.value
            // );
          }}
        />
        <label htmlFor="your-expense">👨‍🦰 Your Expense</label>
        <input
          type="number"
          value={form.your_expense}
          onChange={(e) => {
            // setForm({ ...form, your_expense: Number(e.target.value) });
            autoFillFormExpense(
              "your_expense",
              "friend_expense",
              "total_amount",
              e.target.value
            );
          }}
        />
        <label htmlFor="other-expense">
          👨‍🦰 {selectedFriend.name}'s Expense
        </label>
        <input
          type="number"
          value={form.friend_expense}
          onChange={(e) => {
            autoFillFormExpense(
              "friend_expense",
              "your_expense",
              "total_amount",
              e.target.value
            );
          }}
        />
        <label htmlFor="other-expense">🤑 Who is paying the bills?</label>
        <select
          value={form.bill_payed_by}
          onChange={(e) => setForm({ ...form, bill_payed_by: e.target.value })}
        >
          <option value="You">You</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
        <button className="button">Split Bill</button>
      </form>
    </>
  );
}

function FriendList({ friendList, handleSelection }) {
  return (
    <ul>
      {friendList.map((initialFreind) => {
        return (
          <li>
            <img src={initialFreind.image} alt="Profile pic" />
            <h3>{initialFreind.name}</h3>
            <p>
              {initialFreind.balance < 0
                ? `You owe ${initialFreind.name} ${Math.abs(
                    initialFreind.balance
                  )} amount.`
                : initialFreind.balance === 0
                ? "Amount is already settled."
                : `${initialFreind.name} owe you ${initialFreind.balance} amount.`}
            </p>
            <button
              className="button"
              onClick={() => handleSelection(initialFreind)}
            >
              Select
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default EatNSplit;
