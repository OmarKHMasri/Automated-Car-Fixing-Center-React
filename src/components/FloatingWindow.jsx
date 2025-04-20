import CustomForm from './CustomForm'

export default function FloatingWindow(props) {
    return (
        <div className="FloatingWindow">
            <h2>{props.btnId}</h2>
            <CustomForm setBtnId={props.btnId}/>
        </div>
    )
}