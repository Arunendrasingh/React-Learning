import "./index.css";

function Header() {
  return (
    <header className="header">
      <h1>React Pizza Shop</h1>
    </header>
  );
}
function Menu() {
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <div>
        <Pizza
          name="Focaccia"
          image_url="pizzas/focaccia.jpg"
          ingredients="Bread with italianss olive oil and rosemary"
          price={10}
        />
        <Pizza
          name="Pizza Spinaci"
          image_url="pizzas/spinaci.jpg"
          ingredients="Tomato, mozarella, spinach, and ricotta cheese"
          price={12}
        />
        <Pizza
          name="Pizza Prosciutto"
          image_url="pizzas/prosciutto.jpg"
          ingredients="Tomato, mozarella, ham, aragula, and burrata chees"
          price={18}
        />
      </div>
    </div>
  );
}
function Footer() {
  return (
    <div className="footer">
      <p>It is footer.</p>
    </div>
  );
}

// Creating a new component pizza
function Pizza({ name, image_url, ingredients, price }) {
  return (
    <div className="pizza">
      <img src={image_url} alt="" />
      <h1>{name}</h1>
      <p>{ingredients}</p>
      <p>
        <span>
          <b>Price: </b>
          {price}$
        </span>
      </p>

      <hr />
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
