import { useCallback, useEffect, useState, useRef } from 'react' 
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() => {

let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if (numberAllowed) {
  str += "1234567890"
}
if (charAllowed) {
  str += "~!@#$%^&*()_+{}|?<>,.;'[]"
}
for (let i = 0; i <= length; i++) {
  let char = Math.floor(Math.random() * str.length + 1)
  console.log(char);
  
pass += str.charAt(char)
}
setPassword(pass)
},[length, numberAllowed, charAllowed, setPassword])


const passwordCopyToClipboard = useCallback(() => {

  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])


 useEffect(() => {
  passwordgenerator()
 }, [length, numberAllowed, charAllowed,passwordgenerator])

  return (
    <>
    <div className='w-full m-w-md max-md: shadow-md rounded-lg px-6 py-8 text-gray-900j bg-gray-700'>
      <h1 className='text-white text-center'>Password Generator</h1>
<div className='flex flex-row shadow rounded-lg overflow-hidden mb-4 '>
<input type="text"
      value={password} 
      placeholder='Password'
      className='outline-none w-full py-1 px-3  bg-white' 
      readOnly
      ref={passwordRef}
      />
      <button 
      onClick={passwordCopyToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ' >copy</button>
</div>

<div className='flex text-l gap-x-20'>
<div className='flex items-center gap-x-1'>
  <input 
  type="range"
  min={8}
  max={100}
  value={length}
  className='cursor-pointer'
  onChange={(e) => {setLength(e.target.value)}}
  />
 
    <label>length:  {length}</label>
</div>

<div className='flex items-center gap-x-1'>
  <input 
  type="checkbox"
  value={numberAllowed}
  className='cursor-pointer '
  onChange={() => {
    setNumberAllowed((prev) => !prev )
  }}
  />
 
    <label>number</label>
</div>

<div className='flex items-center gap-x-1'>
  <input 
  type="checkbox"
  value={charAllowed}
  className='cursor-pointer'
  onChange={() => {
    setCharAllowed((prev) => !prev )
  }}
  />
 
    <label>char</label>
</div>


</div>
    </div>

     </>

  )
}

export default App
