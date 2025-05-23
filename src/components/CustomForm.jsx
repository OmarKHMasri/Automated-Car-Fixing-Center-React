import { useState, useEffect, useMemo } from "react";
import AddCarForm from "./Windows/AddCarForm";
import CarListTable from "./Windows/CarListTable"
import SearchCarForm from "./Windows/SearchCarForm"

export default function CustomForm(props) {
    const [btnId, setBtnId] = useState()
    const [clickedRow, setClickedRow] = useState([null , 1])

    useEffect(() => {
        const idSet = () => setBtnId(props.setBtnId)
        idSet();
    }, [])
    
    


    return (
        clickedRow[1] == 0 && <AddCarForm clickedRow={clickedRow} setClickedRow={setClickedRow}/> ||
        btnId == 2 && <AddCarForm /> ||
        btnId == 3 && <SearchCarForm btnId={btnId}/> ||
        btnId == 4 && <CarListTable setClickedRow={setClickedRow}/>
    
    )
    }