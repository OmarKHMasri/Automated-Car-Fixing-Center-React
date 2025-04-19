import { useState } from 'react'
import Button from './Button'
import Logo from '../images/retro.png'

export default function Sidebar(props) {

    // const [isFloating, setIsFloating] = useState(false)

    function hanldeBtnClick(id) {
        props.setIsFloating(prev => !prev)
        props.setBtnId(id)
        
    }

    return (
        <div className='SideBar'>
            <img src={Logo} className='Logo' />
            <Button
                id={1}
                normal="../src/images/dashboard.png"
                hovered="../src/images/dashboard-w.png"
                text="Dashboard"
                className="Sliding-SideBtn "
                onClick={() => hanldeBtnClick(1)}
            />
            <Button
                id={2}
                normal="../src/images/start-service.png"
                hovered="../src/images/start-service-w.png"
                text="Add Car"
                className="Sliding-SideBtn "
                onClick={() => hanldeBtnClick(2)}
            />
            <Button
                id={3}
                normal="../src/images/Check-car.png"
                hovered="../src/images/Check-car-w.png"
                text="Car Status"
                className="Sliding-SideBtn"
                onClick={() => hanldeBtnClick(3)}
            />
            <Button
                id={4}
                text="Car List"
                normal="../src/images/car-info.png"
                hovered="../src/images/car-info-w.png"
                className="Sliding-SideBtn "
                onClick={() => hanldeBtnClick(4)}
            />
            <Button
                id={5}
                normal="../src/images/worker.png"
                hovered="../src/images/worker.png"
                text="Workers"
                className="Static-SideBtn"
                onClick={() => hanldeBtnClick(5)}
            />
            <Button
                id={6}
                normal="../src/images/user.png"
                hovered="../src/images/user.png"
                text="Users"
                className="Static-SideBtn"
                onClick={() => hanldeBtnClick(6)}
            />
            <p>Hellooooo</p>
        </div>
    )
}