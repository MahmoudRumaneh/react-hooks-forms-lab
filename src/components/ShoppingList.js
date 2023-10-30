import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState('');

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All" && searchText === "") return true;
    if (selectedCategory !== "All" && searchText === "") return item.category === selectedCategory;
    if (selectedCategory === "All" && searchText !== "") return item.name.toLowerCase().includes(searchText.toLowerCase());
    return item.category === selectedCategory && item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;



