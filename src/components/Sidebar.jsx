import { useState } from 'react'
import Button from './Button'
import Logo from '../images/retro.png'
import sideBarButtons from '../JSON/sideBarButtons.json'

export default function Sidebar(props) {

    function hanldeBtnClick(id) {
        props.setIsFloating(prev => !prev)
        props.setBtnId(id)

    }

    return (
        <div className='SideBar'>
            <img src={Logo} className='Logo' />
            {
                sideBarButtons.buttons.map((btn) =>
                    <Button
                        key={btn.id}
                        id={btn.id}
                        className={btn.className}
                        text={btn.text}
                        onClick={() => hanldeBtnClick(btn.id)}
                        normal={btn.normal}
                        hovered={btn.hovered}
                    />
                )
            }
            <p>Hellooooo</p>
        </div>
    )
}