import {
   React,
} from "../deps.tsx";

export default function Deal({}: any) {
   return (
      <>
         <div className="badge_deal">
            <div className="deal_icon">
               <img src="/auguro-illustrations/svg-plain/icon-upright-deal-state-lead.svg" />
            </div>
            <div className="deal_body">
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
};
