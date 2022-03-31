import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Addslot(props) {

    return(
            <>
            
            
            <div className="row udb_addslotsec mb-4">
                        <div className="col-9 udb_addslotsec1 pt-3 pb-3">
                           <div>
                             <div> <span className="udb_slotinputtext  p-2"> Slot </span> <input type="text" className="udb_slotinput p-1" /> </div>
                           </div>
                           <div>
                           <div> <span className="udb_slotinputtext  p-2"> Wing </span> <input type="text" className="udb_slotinput p-1"/> </div>
                           </div>
                             <div className="udb_planbtncontainer">
                             <span className="udb_plantxt me-2">Plan</span>
                             <button type="button" class="btn btn-outline-info udb_planbtn me-2">D</button>
                             <button type="button" class="btn btn-outline-primary udb_planbtn me-2">W</button>
                             <button type="button" class="btn btn-outline-warning udb_planbtn me-2">M</button>
                             <button type="button" class="btn btn-outline-success udb_planbtn me-2">Q</button>
                             <button type="button" class="btn btn-outline-danger udb_planbtn me-2">Y</button>
                             </div>
                        </div>
                        <div className="col-2">
                           <div className="udb_addslotamt">
                             <div className="udb_addslotamttext"> Amount </div>
                             <div> $ {props.amount} </div>
                           </div>
                        </div>
                        <div className="col-1 pt-3">
                        < AiOutlineCloseCircle size={25} style={{color:'#aaa4a4'}}/>
                        </div>
                      </div>
            </>
    );
}