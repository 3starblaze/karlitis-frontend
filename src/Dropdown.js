import { useState } from 'react';

function Dropdown({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-blue-500 border">
          <button
            className="bg-blue-100 w-full"
            onClick={ () => setOpen(!open) }
          >
            { title }
          </button>
          <div className={ !open ? "hidden" : ""}>
            { children }
          </div>
        </div>
    );
}

export default Dropdown;
