import React, { useState } from 'react'

function BlogDropdown() {
          const [selectedValue, setSelectedValue] = useState('');


          const handleSelectChange = (event) => {
                    setSelectedValue(event.target.value);
                  };
  return (
    <>
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option className='bg-green-700 p-5 text-center text-white ' value="option1">Publish</option>
        <option className='bg-red-700 p-5 text-center text-white '  value="option2">Unpublish</option>
      </select>

    </>
  )
}

export default BlogDropdown
