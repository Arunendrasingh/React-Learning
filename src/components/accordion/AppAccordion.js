import { useState } from "react";
import "./accordionStyles.css";

const accordionData = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function AppAccordion() {
  const [toggle, setToggle] = useState(false);
  const updateToggle = (id) => {
    if (toggle === id) {
      setToggle(false);
    } else {
      setToggle(id);
    }
  };
  return (
    <div className="accordion">
      {accordionData.map((accordion, index) => (
        <AccrodionItem
          key={index}
          toggle={toggle}
          setIsOpen={updateToggle}
          number={index + 1}
          title={accordion.title}
          text={accordion.text}
        />
      ))}
    </div>
  );
}

function AccrodionItem({ number, title, text, toggle, setIsOpen }) {
  // Set a state to open and close the accrodion
  let isOpen = toggle === number - 1;
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(number - 1)}
    >
      <div className="number">{number}</div>
      <div className={`text ${isOpen ? "title" : ""}`}>{title}</div>
      <div className="icon">{isOpen ? "-" : "+"}</div>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

export default AppAccordion;
