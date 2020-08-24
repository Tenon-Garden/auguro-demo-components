import { React, Component, ComponentClass } from "../deps.tsx";

// import {
//    ReactComponent as IconDealStateLead
// } from "../../auguro-illustrations/svg-plain/icon-upright-deal-state-lead.svg";


function Deal({}: any) {
   return (
      <>
         <div>
            <div>
               <img src="../../auguro-illustrations/svg-plain/icon-upright-deal-state-lead.svg" />
            </div>
            <div>
               <h1>Deal Name</h1>
               <h4>Deal Subtext</h4>
               <ul>
                 <li>Total: $12,000.00</li>
                 <li>Licenses: 10</li>
                 <li>Price per License: $1,200.00</li>
               </ul>
            </div>
         </div>
      </>
  );
}

export default {
   Deal,
};
