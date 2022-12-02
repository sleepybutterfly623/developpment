import './App.css';
import {useEffect, useState} from "react";
import menu from "./assets/menu-items.json";
import DisplayItemCard from './components/Item';
import logo from "./cafe-logo.png";
import * as React from 'react';

menu.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {

  //---------------------------------------------------------------------------------------------------------------------
  /* AGGREGATOR */
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    total();
  }, [cart])

  const total = () => {
    let totalVal = 0; 
    for (let i = 0; i < cart.length; i++){
      totalVal += Number(cart[i].price); 
    }
    setCartTotal(Math.round(totalVal * 100)/100)
  };

  const addToCart = (el) => {
    const currCart = [...cart, el];
    const updatedCart = [...new Set(currCart)]
    setCart([...updatedCart]);
  }

  const removeFromCart = (name) => {
    const newCart = cart.filter((item) => item.name !== name); 
    setCart([...newCart]);
  }

  const shoppingCart = cart.map((el) => (
      <div>
        <p className='cart-text'>{el.name}</p>
        <button id='delete-button' onClick={() => removeFromCart(el.name)}>Delete</button>
      </div>
  ))

  //---------------------------------------------------------------------------------------------------------------------
  /* FILTERING */
  const [filters, setFilters] = useState(Array(8).fill(false)); 

  let filteredMenu = [...menu]

  const toggleFilter = (index) => {
    const filtersCopy = [...filters]  // copy the state array
    filtersCopy[index] = !filtersCopy[index] // toggle it
    setFilters(filtersCopy)
  }

  if(filters[0]){
    filteredMenu = filteredMenu.filter((item) => item["product-type"] === "Drinks")
  }

  if(filters[1]) {
    filteredMenu = filteredMenu.filter((item) => item['product-type'] === "Waffles")
  }

  if(filters[2]){
    filteredMenu = filteredMenu.filter((item) => item['product-type'] === "Donuts")
  }

  if(filters[3]){
    filteredMenu = filteredMenu.filter((item) => item['product-type'] === "Spreads")
  }

  if(filters[4]){
    filteredMenu = filteredMenu.filter((item) => item['product-type'] === "Breads")
  }

  if(filters[5]){
    filteredMenu = filteredMenu.filter((item) => item['dietary-restrictions'].includes("Dairy-free"))
  }

  if(filters[6]){
    filteredMenu = filteredMenu.filter((item) => item['dietary-restrictions'].includes("Gluten-free"))
  }

  if(filters[7]){
    filteredMenu = filteredMenu.filter((item) => item['dietary-restrictions'].includes("Nut-free"))
  }

//---------------------------------------------------------------------------------------------------------------------
/* SORTING */
  const [currSort, setSort] = useState();

  const onChange = event => {
    setSort(event.target.value)
  }

  if(currSort === "price"){
    filteredMenu.sort((itemOne, itemTwo) => itemOne['price'] - itemTwo['price']);
  }

  if(currSort === "popular"){
    filteredMenu.sort((itemOne,itemTwo) => itemTwo['popularity'] - itemOne['popularity']);
  }
  //---------------------------------------------------------------------------------------------------------------------

  return (
    <div id="App">
      <header>
        <center><img src={logo} id="App-logo" alt="logo"></img></center>
      </header>

      <div id="Bakery-Message">
        <i><h2>Morning from the Bakers</h2></i>
        <p>Due to popularity of our items, we are only allowing customers to order <b>one item</b> from each category! </p>
        <p>Thank you for your endless support and enjoy!</p>
      </div>

      <br></br>

      <div id="Row">
        <div id="Buttons">
          <div>
              <h3>Sort By</h3>
              <div>
                <input 
                  type="radio" 
                  name="radio"
                  value={undefined}
                  onChange={onChange}
                  defaultChecked={true}
                  /> All
              </div>
              <br></br>
              <div>
                <input 
                  type="radio" 
                  name="radio"
                  value={"popular"}
                  onChange={onChange}
                  /> Popular
              </div>

              <br></br>

              <div>
                <input 
                  type="radio" 
                  name="radio"
                  value={"price"}
                  onChange={onChange}
                  /> Price
              </div>
          </div>

          <div>
            <h3>Types</h3>
            <div>
              <label>
                <input
                  type = "checkbox"
                  onChange={() => toggleFilter(0)}/>
                Drinks
              </label>
            </div>

            <br></br>

            <div>
              <label>
                <input
                  type = "checkbox"
                  onClick={() => toggleFilter(1)}/>
                Waffles
              </label>
            </div>

            <br></br>

            <div>
              <label>
                <input
                  type = "checkbox"
                  onClick={() => toggleFilter(2)}/>
                Donuts
              </label>
            </div>

            <br></br>

            <div>
              <label>
                  <input
                  type = "checkbox"
                  onClick={() => toggleFilter(3)}/>
                  Spreads
              </label>
            </div>

            <br></br>

            <div>
              <label>
                <input
                  type = "checkbox"
                  onClick={() => toggleFilter(4)}/>
                Breads
              </label>
            </div>

          </div>

          <div>
            <h3>Dietary Restrictions</h3>
            <label>
              <input
                type = "checkbox"
                onClick = {() => toggleFilter(5)}/>
              Dairy-free
            </label>

            <br></br>
            <br></br>

            <label>
              <input
                type = "checkbox"
                onClick = {() => toggleFilter(6)}/>
              Gluten-free
            </label>

            <br></br>
            <br></br>
            
            <label>
              <input
                type = "checkbox"
                onClick = {() => toggleFilter(7)}/>
              Nut-free
            </label>
          </div>   

          <br></br>
          <br></br>
        </div>

        <div id="Cards">
          {filteredMenu.map((item, index) => (
              <div className="menuItems" id={index}>
                <div>
                  <img id='img' src = {item.image} alt={item.name}></img>
                </div>

                <div id='container'>
                  {DisplayItemCard(item)}
                  <button id="addToCartButton" onClick={() => {
                    addToCart(item);  
                  }}>Add To Cart</button>
                </div>

              </div>
            ))}
        </div>

        <div id='Carts'>
          <h2 className='cart-text'>My Cart</h2>
          {shoppingCart}
          <h3 className='cart-text'>Cart Total: ${cartTotal}</h3>
        </div>

      </div>
    </div>
  );
}

export default App;
