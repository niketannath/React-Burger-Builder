import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    let ans = Object.keys(props.ingrdnt).map((igKey,i) => {
        return [...Array(props.ingrdnt[igKey])].map((_,ind) => {
            return <BurgerIngredient key={igKey+ind} type={igKey}></BurgerIngredient>
        })
    }) 
    .reduce((arr,el)=>{
        return arr.concat(el);
    },[])
   
    if(ans.length===0)
        ans=(<div>Please start adding ingredients!</div>);
    
       
    // *********   MY WAY OF DOING THIS   *********
/* 
    let saladCnt = props.ingrdnt.salad;
    let baconCnt = props.ingrdnt.bacon;
    let cheeseCnt = props.ingrdnt.cheese;
    let meatCnt = props.ingrdnt.meat;
    let ans=[];
    if(saladCnt+baconCnt+cheeseCnt+meatCnt===0)
        ans=(<div>Please start adding ingredients!</div>);
    
    else{
        let i=0;
        while(saladCnt--)
        {
            ans.push(<BurgerIngredient type="salad" key={"salad"+i}></BurgerIngredient>);
            i++;
        }
        
        i=0;
        while(baconCnt--)
        {
            ans.push(<BurgerIngredient type="bacon" key={"bacon"+i}></BurgerIngredient>);
            i++;
        }

        i=0;
        while(cheeseCnt--)
        {
            ans.push(<BurgerIngredient type="cheese" key={"cheese"+i}></BurgerIngredient>);
            i++;
        }
        
        i=0;
        while(meatCnt--)
        {
            ans.push(<BurgerIngredient type="meat" key={"meat"+i}></BurgerIngredient>);
            i++;
        }
    }
*/    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {ans}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
}

export default burger;