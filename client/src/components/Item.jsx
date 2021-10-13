import React from 'react';


function Item(props) {
  return (
    <div className='item'>
      {props.id !== 0 ?
      <img src={'https://ddragon.leagueoflegends.com/cdn/11.20.1/img/item/' + props.id + '.png'}></img>
    :
        <div></div>
    }
    </div>
  )
}

export default Item;