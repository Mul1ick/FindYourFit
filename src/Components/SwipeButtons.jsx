import React from 'react'

import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import '../SwipeButtons.css'

const SwipeButtons = () => {
  return (
    <>
        <div className="swipeButtons">
            <IconButton className='swipeButtons__left'>
            <CloseIcon fontSize="large"/>
            </IconButton>
            <IconButton className='swipeButtons__cart'>
            <ShoppingCartIcon fontSize="large"/>
            </IconButton>
            <IconButton className='swipeButtons__right'>
            <FavoriteIcon fontSize="large"/>
            </IconButton>
            

        </div>
    </>
  )
}

export default SwipeButtons