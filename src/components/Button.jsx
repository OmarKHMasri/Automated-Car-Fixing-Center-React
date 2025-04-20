import { useState } from "react"
export default function Button(props) {
    const [isHoverd, setIsHoverd] = useState(false)
    
    return (
        <button
            className={props.className}
            onClick={props.onClick}
            onMouseEnter={() => setIsHoverd(true)}
            onMouseLeave={() => setIsHoverd(false)}
        >
            <img src={isHoverd ? `${props.hovered}` : `${props.normal}`}/>
            {props.text}
        </button>
    )
}