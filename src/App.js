import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe'



const App=()=>{

  const APP_ID="ddce5e42";
  const APP_KEY="0267a05fa699522c61147685bd390b17";
     
  const[recipies,setRecipies] = useState([]);
  const[search,setSearch] = useState(['']);
  const[query, setQuery]=useState('salad');


  useEffect(()=>{
  getRecipies();
  },[query]);

  const getRecipies= async()=>{
    const response= await fetch(`https://api.edamam.com/search?q=${query} &app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data= await response.json();
  setRecipies(data.hits);
  console.log(data.hits)

  }

  const updateSearch=e=>{
setSearch(e.target.value);

  }

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
      setSearch('');
  }
 
  return(
    <div className="App">
<form onSubmit={getSearch} className="search-form">
  <input className="search-bar" type="text"  value={search} onChange={updateSearch} />
  <button  className="search-button" type="submit">
   Search
   </button>
</form>
<div className="recipes">
{recipies.map(recipe=>(
<Recipe key={recipe.recipe.label}
title={recipe.recipe.label}  
calories={recipe.recipe.calories}
image={recipe.recipe.image} 
ingredients={recipe.recipe.ingredients}/>))}

</div>
    </div>
  );

}
export default App;
