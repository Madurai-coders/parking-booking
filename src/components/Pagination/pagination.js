import React,{useEffect, useState} from "react";
import "../../assets/css/Pagination/pagination.css"

export default function Pagination(props) {

const[initialpagination , setInitialPagination] = useState([1,2,3]);
const count = props.count;
const perPagecount= 20
const [initial,setInitial] = useState(true);
const [end , setEnd] = useState(false);
const numberofPages= Math.ceil(count/perPagecount);
const[active , setActive]=useState(1);

useEffect(() => {if(numberofPages<=3){
  setEnd(true);
  var initial_value=[]
  for(let i=1;i<=numberofPages;i++){
     initial_value.push(i);
  }
  setInitialPagination(initial_value);
}},[]);

function gotonextpageSet(){
  
  if(numberofPages>initialpagination[2]){
    setInitial(false); 
    var next_value=[]
      initialpagination.map(element => {
          next_value.push(element+1)
      });
      setInitialPagination(next_value);
      if(next_value[0]>active){
      setActive(next_value[0]);
      }
      if (numberofPages == next_value[2]){
        setEnd(true);
      }
  } 

}

function gotoprevpageSet(){
  setEnd(false);
  var prev_value=[]
      initialpagination.map(element => {
          prev_value.push(element-1)
      });
      setInitialPagination(prev_value);
  if(prev_value[2]<active){
        setActive(prev_value[2]);
      }    
  if(1== prev_value[0]){
    setInitial(true);
  }
}


function PassValue(number){
    setActive(number)
props.GetPagination(number)
}
  return (
    <>
               <div className="pagination_container">
                 {!initial && 
                 <div className="pagination_number" onClick={gotoprevpageSet}> &lt; </div>
                 }
                 {initialpagination.map((number)=>{
                   return (<div className={(active==number) ? 'pagination_number_active' : 'pagination_number'} onClick={()=>PassValue(number)}> {number} </div>);
                 })}
           
                 {!end &&
                 <div className="pagination_number" onClick={gotonextpageSet}> &gt; </div>}
               </div>
    </>
  );
}
