import { useEffect, useState } from "react";
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

function EatNSplit() {
  // Initial-Friend state
  const [friendList, setFriendList] = useState(initialFriends);
  const addFriend = (frinedObj) => {
    setFriendList(() => [...friendList, frinedObj]);
  };
  // Add friend Form state
  const [isForm, setIsForm] = useState(0);
  const toggleFriendForm = () => {
    setIsForm(!isForm);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Boll Splitter App</h1>
      <div className="app" style={{padding: "10px"}}>
        <div className="sidebar">
          <FriendList friendList={friendList} />
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
    let new_obj = { id: Date.now(), name: name, image: img, balance: 0 };
    addNewFriend(new_obj);
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

function FriendList({ friendList }) {
  return (
    <ul>
      {friendList.map((initialFreind) => {
        return (
          <li>
            <img src={initialFreind.image} alt="Profile pic" />
            <h3>{initialFreind.name}</h3>
            <p>You/Sarah owe Sarah/you {initialFreind.balance} amount.</p>
            <button className="button">Select</button>
          </li>
        );
      })}
    </ul>
  );
}

export default EatNSplit;
