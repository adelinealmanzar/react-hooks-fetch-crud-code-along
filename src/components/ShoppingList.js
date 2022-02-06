import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect( () => {
    fetch('http://localhost:4000/items').then(r => r.json()).then(itemsArrF => {
      setItems(itemsArrF)
    })
  }, [])

  function handleAddItem(newItemObj) {
    setItems([...items, newItemObj])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }

  function handleDelete(itemWantToDelete) {
    const updatedItems = items.filter(item => item.id !== itemWantToDelete.id)
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleUpdateItem={handleUpdateItem}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
