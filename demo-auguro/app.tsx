import {
   React,
   ReactDOMServer,
} from "./deps.tsx";

import { Deal } from "./components/mod.ts";


declare global {
   namespace JSX {
      interface IntrinsicElements {
         [key: string]: any;
      }
   }
};

const App = () => {
   const [count, setCount] = (React as any).useState(0);
   return (
      <>
         <Deal />
         <div>
            <h1>Hello DenoLand!</h1>
            <button onClick={() => setCount(count + 1)}>Click the 🦕</button>
            <p>You clicked the 🦕 {count} times</p>
          </div>
      </>
   );
};

export { App, Deal, };
