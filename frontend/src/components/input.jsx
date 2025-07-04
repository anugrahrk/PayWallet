import React from 'react'

function Input({label,placeholder,onChange}) {
  return (
    <div><label class="block text-gray-700 text-sm font-bold mb-2 pt-2" for="username">
        {label}
      </label>
      <input onChange={onChange}class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={placeholder}/></div>
  )
}

export default Input