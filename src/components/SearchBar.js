import 'bootstrap/dist/css/bootstrap.min.css';
import "./SearchBar.css"
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SearchBar(props) {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState();

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  function handleFormSubmit(event){
    event.preventDefault();
    axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442m/api/search',{
      searchText
    }).then(function(response){
      setSearchData(response)
    })
  }

  function testingHandler(){
    props.setItemData([{
      title: "testing",
      text: 'price: 9999  post date: 2023.3.13',
      poster: 'testing'
    }])
  }

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="mt-2 me-2 search-bar serach_input"
          aria-label="Search"
          value={searchText}

          onChange={handleSearchTextChange}
          
        />
        <Button type="submit" className="mt-2 me-2" style={{width:'100%'}}>
          Search
        </Button>
      </Form>
      <button onClick={testingHandler}>testing</button>
    </div>
  );
}

export default SearchBar;
