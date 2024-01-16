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
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Boll Splitter App</h1>
      <div className="app">
        <div className="sidebar">
          <FriendList />
          {/* On Click open new form to add a new freind. */}
          <button className="button">Add Freind</button>
        </div>
      </div>
    </>
  );
}

function FriendList() {
  return (
    <ul>
      {initialFriends.map((initialFreind) => {
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
